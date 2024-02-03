const {Client} = require("discord.js");
const {Logger} = require("../Helpers/Logger");
module.exports = {
    name: 'ready',
    once: true,
    /**
     *
     * @param {Client} client
     */
    async run(client) {

        await require("../Helpers/Command_Loader")(client);
        await Logger.infoAsync(`${client.user.displayName} has started`, "Bot");

        client.user.setPresence({activities: [{name: "Helping The Devs"}], status: "dnd"});


    }

}