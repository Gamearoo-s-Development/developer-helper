/**
 * This script is used to reset all commands in the bot.
 * Please run it separately with the `node Source/Command_Reset.js` command.
 */

const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {
    console.log("Clearing all commands in 3s...");
    setTimeout(() => {
        client.application.commands.set([]).then(() => {
            console.log("All commands have been cleared!");
            process.exit(0);
        });
    }, 3000);
});

client.login(process.env.BOT_TOKEN);