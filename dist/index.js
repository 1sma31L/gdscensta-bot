import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
// Replace with your bot's token
const BOT_TOKEN = process.env.TELEGRAM_BOT_API;
const WEBHOOK_URL = "https://gdscensta-bot.vercel.app"; // Replace with your webhook URL
const app = express();
app.use(bodyParser.json());
// Initialize the bot in webhook mode
const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(WEBHOOK_URL);
// Define the bot logic
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to the bot! How can I assist you?");
    }
    else {
        bot.sendMessage(chatId, `You said: ${text}`);
    }
});
// Handle incoming webhook requests
app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
