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
		"Web Development": "https://t.me/+_IPmZ5-TpF1mOTI0",
		"App Development": "https://t.me/+88L0_qp2s3M1NjY0",
		"Artificial Intelligence": "https://t.me/+AdP_VzxMQ6A0OGI0",
		"Cyber Security": "https://t.me/+amZMY17AL2A3NjFk",
		"UI/UX Design": "https://t.me/+GrYRScDqKl4yZTM0",
		"Human Resources": "https://t.me/+kEIV-6t-qbo2YTFk",
		"External Relations": "https://t.me/+jeqsgIzFIJZlODQ0",
		Projects: "https://t.me/+SHCfGII7Y3AzMjY0",
		Communications: "https://t.me/+z2KLzu3ZQxllZDA0",
		IT: "https://t.me/+neKBXQqCmf44MWE8",
		MAIN: "https://t.me/+EKvjqHIlk9RjNjk0",
	};

	// Commands
	if (text === "/start") {
		bot.sendMessage(
			chatId,
			`Welcome to our club!. Join our club's main Telegram group : ${DEP_LINKS.MAIN}, And also choose a department:`,
			{
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
			}
		);
		userState[chatId] = "main_menu";
		return;
	}

	if (text === "/departments") {
		bot.sendMessage(
			chatId,
			"Links to all of our departments:\n\n" +
				`Web Development: ${DEP_LINKS["Web Development"]}\n` +
				`App Development: ${DEP_LINKS["App Development"]}\n` +
				`Artificial Intelligence: ${DEP_LINKS["Artificial Intelligence"]}\n` +
				`Cyber Security: ${DEP_LINKS["Cyber Security"]}\n` +
				`UI/UX Design: ${DEP_LINKS["UI/UX Design"]}\n`
		);
		return;
	}

	if (text === "/sub_departments") {
		bot.sendMessage(
			chatId,
			"Links to all of our sub-departments:\n\n" +
				`Human Resources: ${DEP_LINKS["Human Resources"]}\n` +
				`External Relations: ${DEP_LINKS["External Relations"]}\n` +
				`Communications: ${DEP_LINKS["Communications"]}\n` +
				`IT: ${DEP_LINKS["IT"]}\n` +
				`Projects: ${DEP_LINKS["Projects"]}\n`
		);
		return;
	}

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
			delete userState[chatId];
			bot.sendMessage(chatId, `Thank you for your selection.`, {
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
