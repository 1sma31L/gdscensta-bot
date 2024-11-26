import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_API;
const WEBHOOK_URL = "https://gdscensta-bot.vercel.app";
const app = express();
app.use(bodyParser.json());
const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(WEBHOOK_URL);
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to the bot! How can I assist you?");
        bot.getMyCommands();
    }
    else {
        bot.sendMessage(chatId, `You said: ${text}`);
    }
});
app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
