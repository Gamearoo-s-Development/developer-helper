const {PermissionFlagsBits, TextInputStyle} = require("discord-api-types/v10");
const {CommandInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder} = require("discord.js");
const Client = require("../../Source/Bot");

module.exports = {
    name: 'suggest',
    description: 'Give us a suggestion!',
    perm: PermissionFlagsBits.SendMessages,
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @param {*} extras
     */
    async run(interaction, client, extras) {
        const suggestionModal = new ModalBuilder()
            .setTitle("Suggestion")
            .setCustomId("suggestion");

        const suggestionInput = new TextInputBuilder()
            .setLabel("Please enter your suggestion bellow:")
            .setStyle(TextInputStyle.Paragraph)
            .setCustomId("suggestionContent")
            .setRequired(true)
            .setMinLength(24);

        const row = new ActionRowBuilder()
            .addComponents(suggestionInput);

        suggestionModal.addComponents(row);

        await interaction.showModal(suggestionModal);
    }
}