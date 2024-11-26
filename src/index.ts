import { Telegraf } from "telegraf";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_API!;
const bot = new Telegraf(BOT_TOKEN);

// Departments example
const departments = {
    tech: ["Frontend Group", "Backend Group"],
    design: ["UI/UX Group", "Graphic Design Group"],
    marketing: ["Content Creation", "Social Media"],
};
type TDepartments = keyof typeof departments;

// Express app setup
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Telegram bot commands
bot.start((ctx) =>
    ctx.reply(
        "Welcome! Use /choose to pick a department or type a department name.",
    ),
);

bot.command("choose", (ctx) => {
    const departmentList = Object.keys(departments)
        .map((dept) => `- ${dept}`)
        .join("\n");
    ctx.reply(`Choose a department:\n${departmentList}`);
});

bot.on("text", (ctx) => {
    const text = ctx.message.text.toLowerCase();
    if (text in departments) {
        const group = departments[text as TDepartments];
        if (group) {
            ctx.reply(
                `Here are the groups for the ${text} department:\n${group.join("\n")}`,
            );
        } else {
            ctx.reply(
                "Department not found. Use /choose to see available departments.",
            );
        }
        ctx.reply(
            `Here are the groups for the ${text} department:\n${group.join("\n")}`,
        );
    } else {
        ctx.reply(
            "Department not found. Use /choose to see available departments.",
        );
    }
});

// Telegraf webhook integration with Express
app.use(bot.webhookCallback("/telegram"));

// Test route for Express
app.get("/", (req, res) => {
    res.send("Welcome to the Telegram bot server!");
});

// Set the webhook URL (replace with your public URL)
const PUBLIC_URL = "https://gdscensta-bot.vercel.app/";
bot.telegram.setWebhook(`${PUBLIC_URL}/telegram`);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Webhook set to:", `${PUBLIC_URL}/telegram`);
});
