const { CommandInteraction, Client } = require("discord.js");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Client} client 
 */

module.exports = {
    name: "emit",
    description: "Emits an instance of a specified event",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member events",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                }
            ]
        }
    ],
    execute (interaction, client) {
        const choices = interaction.options.getString("member");

        switch (choices) {
            case "guildMemberAdd": 
                {
                    client.emit("guildMemberAdd", interaction.member);
                    interaction.reply({
                        content: "Emitted the event", 
                        ephemeral: true
                    });
                }
                break;
            case "guildMemberRemove": 
                {
                    client.emit("guildMemberRemove", interaction.member);
                    interaction.reply({
                        content: "Emitted the event", 
                        ephemeral: true
                    });
                }
                break;
        }
    }
}