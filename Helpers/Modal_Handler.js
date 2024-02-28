const {ModalSubmitInteraction, EmbedBuilder} = require('discord.js');
const Client = require("../Source/Bot");
const config = require("./Config_Helper");
const {ChannelType} = require("discord-api-types/v10");

/**
 *
 * @param {ModalSubmitInteraction} interaction
 * @param {Client} client
 */
module.exports = async (interaction, client) => {
    if (interaction.customId === "suggestion") {
        const suggestionContent = interaction.fields.getTextInputValue("suggestionContent");
        await interaction.deferReply({ ephemeral: true });

        const channel = interaction.guild.channels.cache.get(config.SUGGESTION_CHANNEL_ID) || await interaction.guild.channels.fetch(config.SUGGESTION_CHANNEL_ID);
        if (!channel || channel.type !== ChannelType.GuildText) {
            console.log(channel)
            await interaction.editReply({ content: "The suggestion channel is not setup properly" });
            return;
        }
        const embed = new EmbedBuilder()
            .setTitle("New suggestion")
            .setDescription("> " + suggestionContent.split("\n").join("\n> "))
            .setColor("#800080")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()
            .setFooter({ text: `Suggestion - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });
        await channel.send({ embeds: [embed] });

        await interaction.editReply({ content: "Suggestion sent, thank you!" });
    }
}