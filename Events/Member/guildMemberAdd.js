const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { EntranceID, EntranceToken } = require("../../Structures/config.json");

/**
 * 
 * @param {GuildMember} member 
 */

module.exports = {
    name: "guildMemberAdd",
    execute (member) {
        const { user, guild } = member;

        member.roles.add("319886814909562881");
        const Welcomer = new WebhookClient({
            id: EntranceID,
            token: EntranceToken
        });

        const Welcome = new MessageEmbed()
            .setColor("YELLOW")
            .setAuthor({
                name: user.tag, 
                iconURL: user.avatarURL({dynamic: true, size: 512})
            })
            .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
                Welcome ${member} to the **${guild.name}**!\n
                Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
                Latest Member Count: **${guild.memberCount}**`)
            .setFooter({text: `ID: ${user.id}`});

        Welcomer.send({embeds: [Welcome]});
    }
}