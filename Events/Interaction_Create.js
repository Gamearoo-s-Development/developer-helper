const { BaseInteraction, PermissionsBitField } = require('discord.js');
const {Logger} = require("../Helpers/Logger");


module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     *
     * @param {BaseInteraction} interaction
     */
    async run(interaction) {
        const client = interaction.client;
        const { commandName } = interaction;
        if (interaction.isModalSubmit()) {
            return require("../Helpers/Modal_Handler")(interaction, client);
        }
        if (!interaction.isCommand()) return null;

        let command = client.commands.get(commandName);

        const commands = client.application.commands;


        if (!command) {
            interaction.reply(`${commandName} was removed!`);
            commands.delete(interaction.commandId).then(cmd => {
                Logger.warnAsync(`${commandName} was not found so i removed it`, "Bot");
            })
            return;
        }

        const permcheck = new PermissionsBitField(command.perm);

        if (!interaction.member.permissions.has(permcheck)) return interaction.reply({ content: `Missing ${permcheck.toArray()}`, ephemeral: true }).catch(err => { });

        let extras = {};

        command.run(interaction, client, extras);
    }
}