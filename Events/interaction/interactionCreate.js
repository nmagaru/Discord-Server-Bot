const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { execute } = require("../client/ready");

/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */

module.exports = {
    name: "interactionCreate",
    async execute (interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);

            const Error = new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured while running this command");

            if (!command) return interaction.reply({embeds:[Error]}) && client.commands.delete(interaction.commandName);

            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({
                    content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, 
                    ephemeral: true 
                });
            }

            command.execute(interaction, client);
        }
    }
}