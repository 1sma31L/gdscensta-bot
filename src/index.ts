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

const userState: { [key: number]: string } = {}; // Store user states

bot.on("message", (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;
	if (!text) return;
	const DEP_LINKS: { [key: string]: string } = {
		"Web Development": "https://t.me/webdev_group",
		"App Development": "https://t.me/appdev_group",
		"Artificial Intelligence": "https://t.me/ai_group",
		"Cyber Security": "https://t.me/cybersec_group",
		"UI/UX Design": "https://t.me/uiux_group",
		"Human Resources": "https://t.me/hr_group",
		"External Relations": "https://t.me/+jeqsgIzFIJZlODQ0",
		Projects: "https://t.me/+SHCfGII7Y3AzMjY0",
		Design: "https://t.me/design_group",
		IT: "https://t.me/it_group",
	};

	// Commands
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
		userState[chatId] = "main_menu";
		return;
	}

	if (text === "/departments") {
		bot.sendMessage(
			chatId,
			"Links to all of our departments:\n\n" +
				Object.entries(DEP_LINKS)
					.filter(
						([key]) =>
							![
								"Web Development",
								"App Development",
								"Artificial Intelligence",
								"Cyber Security",
								"UI/UX Design",
							].includes(key)
					)
					.map(([key, link]) => `${key}: ${link}`)
					.join("\n")
		);
		return;
	}

	// if (text === "/sub_departments") {
	// 	bot.sendMessage(
	// 		chatId,
	// 		"Links to all of our sub-departments:\n\n" +
	// 			Object.entries(DEP_LINKS)
	// 				.filter(([key]) =>
	// 					[
	// 						"Human Resources",
	// 						"External Relations",
	// 						"Design",
	// 						"IT",
	// 						"Projects",
	// 					].includes(key)
	// 				)
	// 				.map(([key, link]) => `${key}: ${link}`)
	// 				.join("\n")
	// 	);
	// 	return;
	// }

	// Main Menu Choices
	if (userState[chatId] === "main_menu") {
		if (DEP_LINKS[text]) {
			bot.sendMessage(
				chatId,
				`You chose ${text}. Here's the link to the ${text} Telegram group: ${DEP_LINKS[text]}`
			);
			bot.sendMessage(chatId, "Choose a Sub-Department", {
				reply_markup: {
					keyboard: [
						[{ text: "Human Resources" }],
						[{ text: "External Relations" }],
						[{ text: "Design" }],
						[{ text: "IT" }],
						[{ text: "Projects" }],
					],
					resize_keyboard: true,
					one_time_keyboard: true,
				},
			});
			userState[chatId] = "sub_department";
		} else {
			bot.sendMessage(chatId, "Please choose a valid department.");
		}
		return;
	}

	// Sub-Department Choices
	if (userState[chatId] === "sub_department") {
		if (DEP_LINKS[text]) {
			bot.sendMessage(
				chatId,
				`You chose ${text}. Here's the link to the ${text} Telegram group: ${DEP_LINKS[text]}`
			);
			delete userState[chatId]; // Reset user state after handling sub-department
			bot.sendMessage(chatId, "Thank you for your selection.", {
				reply_markup: {
					remove_keyboard: true,
				},
			});
		} else {
			bot.sendMessage(chatId, "Please choose a valid sub-department.");
		}
		return;
	}

	// Default fallback
	bot.sendMessage(
		chatId,
		"I didn't understand that. Please use /start to begin."
	);
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
