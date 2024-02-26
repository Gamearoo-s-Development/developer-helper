const {DemoEndpoints} = require("ram-api.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {CommandInteraction} = require("discord.js");
const Client = require("../../Source/Bot");
module.exports = {
    name: 'hello',
    description: 'Get a hello',
    perm: PermissionFlagsBits.SendMessages,
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @param {*} extras
     */
    async run(interaction, client, extras) {
        let res = await new DemoEndpoints(60000, 2).helloAsync();

        interaction.reply({ content: res.text });
    }
}