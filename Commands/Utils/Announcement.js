const {PermissionFlagsBits, ApplicationCommandOptionType, ChannelType} = require("discord-api-types/v10");
const {ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");
const Client = require("../../Source/Bot");
const fetch = require("node-fetch");
const config = require('../../Helpers/Config_Helper');

module.exports = {
    name: 'announcement',
    description: 'Sends an announcement to the server',
    perm: PermissionFlagsBits.SendMessages,
    options: [
        {
            name: "title",
            description: "The title of the announcement",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "content",
            description: "The content of the announcement (must be a text file)",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        },
        {
            name: "mention",
            description: "What mention to use",
            type: ApplicationCommandOptionType.Role,
            required: false
        }
    ],
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     * @param {*} extras
     */
    async run(interaction, client, extras) {
        let title = interaction.options.getString("title");
        let content = interaction.options.getAttachment("content");
        let mentionRole = interaction.options.getRole("mention", false);

        if (content.contentType !== "text/plain") {
            await interaction.reply({ content: "The file must be a text file", ephemeral: true });
            return;
        }

        let contentText;

        try {
            contentText = await fetch(content.url).then(res => res.text());
        } catch (err) {
            await interaction.reply({ content: "Failed to read the file", ephemeral: true });
            return;
        }

        const announcementEmbed = new EmbedBuilder()
            .setTitle(title)
            .setColor("#800080")
            .setAuthor({ name: `Announcement made by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`> ` + contentText.split("\n").join("\n> "))
            .setFooter({ text: `Announcement - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp();

        const channel = client.channels.cache.get(config.ANNOUNCEMENT_CHANNEL_ID);
        if (!channel || channel.type !== ChannelType.GuildText) {
            await interaction.reply({content: "The announcement channel was not found", ephemeral: true});
            return;
        }

        const message = await channel.send({
            embeds: [announcementEmbed],
            content: mentionRole ? mentionRole.toString() : null
        });

        await interaction.reply({ content: `Announcement sent in <#${channel.id}> successfully (${message.url})`, ephemeral: true });
    }
}