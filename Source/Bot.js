const {Client, GatewayIntentBits,  Partials, Collection} = require('discord.js');
const {BOT_TOKEN} = require('../Helpers/Config_Helper');
const {Logger} = require("../Helpers/Logger");
const {join} = require("path");
const fs = require("fs");

class Bot extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildIntegrations
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User,
            ],
        });

        const eventsPath = join(__dirname, '../Events');
        const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        this.commands = new Collection();
        for (const file of eventsFiles) {
            const filePath = join(eventsPath, file);

            const event = require(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.run(...args));
            } else {
                this.on(event.name, (...args) => event.run(...args));
            }
        }


    this.login(BOT_TOKEN).then(() =>  {}).catch(async (err) => {await Logger.fatalAsync(err.error, "Bot")});
    }
}

new Bot();