const Discord = require("discord.js")
const { stripIndents } = require("common-tags")
exports.run = async (bot, msg, args) => {

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);

    const noperm1 = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Kick members`` permission to use this command.")

    const nomemberembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "modlogs [member mention]")
        .setFooter("You didn't provide a member to view modlogs.")

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noperm1)
    if(!member) return msg.channel.send(nomemberembed)

    let modlog = await modlogs.find({ serverid: msg.guild.id, userid: member.user.id })

    modlog = modlog.map(element => stripIndents`**Case ID ${element._id}**
                                                **Type**: ${element.type}
                                                **Date**: ${new Date(parseInt(element.date)).toString().split("+")[0]}
                                                **Moderator**: ${element.modtag}
                                                **Reason**: ${element.reason}`)

    const modlogembed = new Discord.MessageEmbed()
        .setColor("#FFB347")
        .setTitle(`Modlogs of ${member.user.tag}`)
        .setDescription(modlog[0] ? modlog.join("\n\n") : "No modlogs found.")

    msg.channel.send(modlogembed)

};