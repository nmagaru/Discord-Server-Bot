const { CommandInteraction, MessageEmbed } = require("discord.js");

/**
 * 
 * @param {CommandInteraction} interaction 
 */

module.exports = {
    name: "suggest",
    description: "Create a suggestion in an organized matter",
    options: [
        {
            name: "type",
            description: "Select the type",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "System",
                    value: "System"
                }
            ]
        },
        {
            name: "name",
            description: "Provide a name for your suggestion",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "Describe the functionality of this suggestion",
            type: "STRING",
            required: true
        }
    ],
    async execute (interaction) {
        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`${interaction.member} has suggested a ${type}`)
            .addField("Name", `${name}`, true)
            .addField("Functionality", `${funcs}`, true);

        const message = await interaction.reply({
            embeds: [Response], 
            fetchReply: true
        });
        
        message.react("<:lumaYes:973710214886989884>");
        message.react("<:lumaNo:973710234256298014>");
    }
}