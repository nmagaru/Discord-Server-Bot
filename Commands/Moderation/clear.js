const { CommandInteraction, MessageEmbed } = require("discord.js");
const { execute } = require("../Developer/ping");

/**
 * 
 * @param {CommandInteraction} interaction 
 */

module.exports = {
    name: "clear",
    description: "Deletes a specified number of messages from the channel or a target",
    permission:"MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Specify the amount of messages to delete",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a target to clear their messages",
            type: "USER",
            required: false
        }
    ],
    async execute (interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed().setColor("RED");
        
        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages.filter((m) => {
                if (m.author.id === Target.id && Amount > 1) {
                    filtered.push(m);
                    i++;
                }
            }))

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} messages from ${Target}`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} messages from current channel`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}