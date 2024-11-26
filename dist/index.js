var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { getChatCompletion } from "./controllers/Chatbot";
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_API;
const WEBHOOK_URL = "https://gdscensta-bot.vercel.app";
const app = express();
app.use(bodyParser.json());
const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(WEBHOOK_URL);
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to the bot! How can I assist you?");
        bot.getMyCommands();
    }
    else if (text) {
        const completion = yield getChatCompletion(text);
        bot.sendMessage(chatId, completion.choices[0].message.content);
    }
}));
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
