const { CommandInteraction } = require("discord.js");

/**
 * 
 * @param {CommandInteraction} interaction 
 */

module.exports = {
    name: "ping",
    description: "Pings the bot to confirm functionality",
    permission: "ADMINISTRATOR",
    execute (interaction) {
        interaction.reply({content: "PONG"});
    }
}