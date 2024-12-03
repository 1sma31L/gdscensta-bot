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

bot.setWebHook(WEBHOOK_URL);

// Main Departments

bot.on("message", (msg) => {
	const chatId = msg.chat.id;
	if (msg.text === "/start") {
		bot.sendMessage(chatId, "Welcome to our club! Choose a department:", {
			reply_markup: {
				keyboard: [
					[{ text: "RH - Ressources Humaine" }],
					[{ text: "Communication (COM)" }],
					[{ text: "IT" }],
					[{ text: "RE - Relations Exterieur" }],
				],
				resize_keyboard: true, // Optional: Make the keyboard smaller
				one_time_keyboard: true, // Optional: Hide the keyboard after a button is clicked
			},
		});
	}
});

bot.on("message", (msg) => {
	const chatId = msg.chat.id;
	const department = msg.text;
	if (department === "RH - Ressources Humaine") {
		bot.sendMessage(chatId, "HR Department:\nChoose a sub-department:", {
			reply_markup: {
				keyboard: [[{ text: "Recruitment" }], [{ text: "Training" }]],
				resize_keyboard: true, // Optional: Make the keyboard smaller
				one_time_keyboard: true, // Optional: Hide the keyboard after a button is clicked
			},
		});
	} else if (department === "com") {
		bot.sendMessage(
			chatId,
			"Communication Department:\nChoose a sub-department:",
			{
				reply_markup: {
					inline_keyboard: [
						[{ text: "Social Media" }],
						[{ text: "Event Planning" }],
					],
				},
			}
		);
	} else if (department === "it") {
		bot.sendMessage(chatId, "IT Department:\nChoose a sub-department:", {
			reply_markup: {
				inline_keyboard: [
					[{ text: "Web Development" }],
					[{ text: "Tech Support" }],
				],
			},
		});
	} else if (department === "re") {
		bot.sendMessage(chatId, "RE Department:\nChoose a sub-department:", {
			reply_markup: {
				inline_keyboard: [[{ text: "Partnership" }], [{ text: "Events" }]],
			},
		});
	}
});

bot.on("callback_query", (query) => {
	const chatId = query.id;
	const subDepartment = query.data as keyof typeof departmentLinks;

	const departmentLinks = {
		hr_recruitment: "https://t.me/hr_recruitment",
		hr_training: "https://t.me/hr_training",
		com_social: "https://t.me/com_social",
		com_events: "https://t.me/com_events",
		it_web: "https://t.me/it_web",
		it_support: "https://t.me/it_support",
		re_partnership: "https://t.me/re_partnership",
		re_events: "https://t.me/re_events",
	};
	if (departmentLinks[subDepartment]) {
		bot.sendMessage(
			chatId,
			`Here is the link to the ${subDepartment.replace("_", " ")} group:\n${
				departmentLinks[subDepartment]
			}`
		);
	}
});

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
