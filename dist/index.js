import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
// Choose a department
const departments = {
    tech: ["Frontend Group", "Backend Group"],
    design: ["UI/UX Group", "Graphic Design Group"],
    marketing: ["Content Creation", "Social Media"],
};
// Replace with your BotFather token
const BOT_TOKEN = process.env.TELEGRAM_BOT_API;
// Create a bot instance
const bot = new Telegraf(BOT_TOKEN);
// Start command
bot.start((ctx) => ctx.reply("Welcome! 🎉\nUse /choose to select a department or type anything to get started!"));
// Help command
bot.help((ctx) => ctx.reply("Use /choose to pick a department or type a department name."));
bot.command("choose", (ctx) => {
    const departmentList = Object.keys(departments)
        .map((dept) => `- ${dept}`)
        .join("\n");
    ctx.reply(`Choose a department:\n${departmentList}`);
});
// Respond to department names
bot.on("text", (ctx) => {
    const text = ctx.message.text.toLowerCase();
    if (text in departments) {
        const group = departments[text]; // Safe access
        ctx.reply(`Here are the groups for the ${text} department:\n${group.join("\n")}`);
    }
    else {
        ctx.reply("Department not found. Use /choose to see available departments.");
    }
});
// Start the bot
bot.launch()
    .then(() => console.log("🤖 Bot is running!"))
    .catch((err) => console.error("Error launching bot:", err));
// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
