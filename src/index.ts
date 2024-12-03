import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_API || "";
const WEBHOOK_URL = "https://gdscensta-bot.vercel.app";

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(BOT_TOKEN);

// Set webhook for the bot
bot.setWebHook(WEBHOOK_URL);

bot.on("message", (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	const DEP_LINKS = {
		"Web Development": "https://t.me/webdev_group",
		"App Development": "https://t.me/appdev_group",
		"Artificial Intelligence": "https://t.me/ai_group",
		"Cyber Security": "https://t.me/cybersec_group",
		"UI/UX Design": "https://t.me/uiux_group",
		"Human Resources": "https://t.me/hr_group",
		"External Relations": "https://t.me/er_group",
		Design: "https://t.me/design_group",
		IT: "https://t.me/it_group",
	};

	// Check for the `/start` command
	if (text === "/start") {
		bot.sendMessage(chatId, "Welcome to our club! Choose a department:", {
			reply_markup: {
				keyboard: [
					[{ text: "Web Development" }],
					[{ text: "App Development" }],
					[{ text: "Artificial Intelligence" }],
					[{ text: "Cyber Security" }],
					[{ text: "UI/UX Design" }],
				],
				resize_keyboard: true,
				one_time_keyboard: true,
			},
		});
		return;
	}

	switch (text) {
		case "Web Development":
		case "App Development":
		case "Artificial Intelligence":
		case "Cyber Security":
		case "UI/UX Design":
			bot.sendMessage(
				chatId,
				`You chose ${text}. Here's the link to the Recruitment team Telegram group: ${DEP_LINKS[text]}`,
				{}
			);
			bot.sendMessage(chatId, "Choose a Sub-Department", {
				reply_markup: {
					keyboard: [
						[{ text: "Frontend" }],
						[{ text: "Backend" }],
						[{ text: "Mobile" }],
						[{ text: "Desktop" }],
						[{ text: "Machine Learning" }],
						[{ text: "Ethical Hacking" }],
						[{ text: "UI" }],
						[{ text: "UX" }],
					],
					resize_keyboard: true,
					one_time_keyboard: true,
				},
			});
			bot.on("message", (msg) => {
				const text = msg.text;
				switch (text) {
					case "Human Resources":
					case "External Relations":
					case "Design":
					case "IT":
						bot.sendMessage(
							chatId,
							`You chose ${text}. Here's the link to the ${text} Telegram group: ${DEP_LINKS[text]}`
						);
						break;
					default:
						bot.sendMessage(
							chatId,
							"Please choose a valid option from the menu."
						);
				}
			});
			break;
		default:
			bot.sendMessage(chatId, "Please choose a valid option from the menu.");
	}
});

/* EXPRESS APP */
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
