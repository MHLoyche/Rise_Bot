require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
});

const CHANNEL_ID = '1343875492272541749'; // Channel ID for patch notes
const CHANNEl_ID_DL = ''; // Channel ID for download links
const LOG_FILE = 'testdb.log';

// run script with 'node index.js' in terminal
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Bot shut down when pressing Ctrl+C in terminal
process.on("SIGINT", () => {
    console.log("Bot shutting down...");
    client.destroy();
    process.exit(0);
});

client.on('messageCreate', async (message) => {
    // Ignore bot messages and messages outside the specified channel
    if (message.author.bot || message.channel.id !== CHANNEL_ID) return;

    // Format the current date and time
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
    }).replace(",", ""); // Removes comma between date and time
    console.log(`Received message: ${message.content}`);
    const logEntry = `[${formattedDate}] ${message.author.tag}:\n ${message.content}\n`;

    try {
        // Read existing logs
        let existingLogs = "";
        if (fs.existsSync(LOG_FILE)) {
            existingLogs = fs.readFileSync(LOG_FILE, "utf8");
        }

        // Prepend new log entry at the beginning
        const updatedLogs = logEntry + "---\n" + existingLogs;

        // Overwrite the file with new order (newest messages at the top)
        fs.writeFileSync(LOG_FILE, updatedLogs, "utf8");

        console.log(`Stored message at the start: ${message.content}`);
    } catch (err) {
        console.error("Error saving message:", err);
    }
});

client.login(process.env.DISCORD_TOKEN);