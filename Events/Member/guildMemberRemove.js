const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { ExitID, ExitToken } = require("../../Structures/config.json")

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute (member) {
        const { user, guild } = member;

        const Logger = new WebhookClient({
            id: ExitID,
            token: ExitToken
        });

        const Goodbye = new MessageEmbed()
            .setColor("YELLOW")
            .setAuthor({
                name: user.tag, 
                iconURL: user.avatarURL({dynamic: true, size: 512})
            })
            .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
                ${member} has left **${guild.name}**!\n
                Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
                Latest Member Count: **${guild.memberCount}**`)
            .setFooter({text: `ID: ${user.id}`});

        Logger.send({embeds: [Goodbye]});
    }
}