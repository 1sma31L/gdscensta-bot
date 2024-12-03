import { GDSC_DESCRIPTION } from "./data";
import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_API;
const WEBHOOK_URL = "https://gdscensta-bot.vercel.app";
const getChatCompletion = async (text) => {
    const url = "https://api.x.ai/v1/chat/completions";
    const apiKey = process.env.GROK_API_KEY;
    const payload = {
        messages: [
            {
                role: "system",
                content: GDSC_DESCRIPTION,
            },
            {
                role: "user",
                content: text,
            },
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0,
        max_tokens: 60,
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
};
//
const app = express();
app.use(bodyParser.json());
const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(WEBHOOK_URL);
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to the bot! How can I assist you?");
    }
    else if (text) {
        const completion = await getChatCompletion(text);
        bot.sendMessage(chatId, completion.choices[0].message.content);
    }
});
app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
app.get("/", (req, res) => {
    res.send("IT IS WORKING");
    res.sendStatus(200);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
