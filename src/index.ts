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

	// Check for the `/start` command
	if (text === "/start") {
		bot.sendMessage(chatId, "Welcome to our club! Choose a department:", {
			reply_markup: {
				keyboard: [
					[{ text: "RH - Ressources Humaine" }],
					[{ text: "Communication (COM)" }],
					[{ text: "IT" }],
					[{ text: "RE - Relations Exterieur" }],
				],
				resize_keyboard: true,
				one_time_keyboard: true,
			},
		});
		return; // Exit to prevent further processing of `/start`
	}

	// Check for "RH - Ressources Humaine" selection
	if (text === "RH - Ressources Humaine") {
		bot.sendMessage(chatId, "HR Department:\nChoose a sub-department:", {
			reply_markup: {
				keyboard: [[{ text: "Recruitment" }], [{ text: "Training" }]],
				resize_keyboard: true,
				one_time_keyboard: true,
				remove_keyboard: true,
			},
		});
		return;
	}

	// Handle sub-department selections
	if (text === "Recruitment") {
		bot.sendMessage(
			chatId,
			"You chose Recruitment. Here's the link to the Recruitment team Telegram group: https://t.me/recruitment_group",
			{
				reply_markup: {
					remove_keyboard: true,
				},
			}
		);
		return;
	}

	if (text === "Training") {
		bot.sendMessage(
			chatId,
			"You chose Training. Here's the link to the Training team Telegram group: https://t.me/training_group"
		);
		return;
	}

	// Handle other cases
	bot.sendMessage(chatId, "Please choose a valid option from the menu.");
});

// bot.on("callback_query", (query) => {
// 	const chatId = query.id;
// 	const subDepartment = query.data as keyof typeof departmentLinks;

// 	const departmentLinks = {
// 		hr_recruitment: "https://t.me/hr_recruitment",
// 		hr_training: "https://t.me/hr_training",
// 		com_social: "https://t.me/com_social",
// 		com_events: "https://t.me/com_events",
// 		it_web: "https://t.me/it_web",
// 		it_support: "https://t.me/it_support",
// 		re_partnership: "https://t.me/re_partnership",
// 		re_events: "https://t.me/re_events",
// 	};
// 	if (departmentLinks[subDepartment]) {
// 		bot.sendMessage(
// 			chatId,
// 			`Here is the link to the ${subDepartment.replace("_", " ")} group:\n${
// 				departmentLinks[subDepartment]
// 			}`
// 		);
// 	}
// });

// bot.sendMessage(chatId, "Would you like to choose another department?", {
// 	reply_markup: {
// 		inline_keyboard: [
// 			[{ text: "Yes, go back to main menu", callback_data: "main_menu" }],
// 		],
// 	},
// });

// bot.on("callback_query", (query) => {
// 	if (query.data === "main_menu") {
// 		bot.sendMessage(query.id, "Choose a department:", {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[{ text: "HR Department", callback_data: "hr" }],
// 					[{ text: "Communication (COM)", callback_data: "com" }],
// 					[{ text: "IT Department", callback_data: "it" }],
// 				],
// 			},
// 		});
// 	}
// });

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
