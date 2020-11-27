const Discord = require('discord.js')
exports.run = async (bot, msg, args) => {

    if (msg.channel.type == "dm") return;

    var args1 = msg.content.split(" ").slice(1)
    var userID = msg.mentions.users.first() || args1.join(" ")

    const nouser = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "unban [user id]")
        .setFooter("You didn't provide an user id.")

    const fail = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Couldn't unban user.")
        .setDescription("Failed to unban user.")

    if(!userID) return msg.channel.send(nouser)

    const noban = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Not banned")
        .setDescription("The user you provided is not banned.")

    const noperm = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Missing permissions")
        .setDescription("You need ``Ban members`` permission to use this command.")

    if(!msg.member.hasPermission("BAN_MEMBERS")) {
        return msg.channel.send(noperm)
    }

    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) {
        return msg.reply(`I don't have perms to unban someone.`)
    }

    msg.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return msg.channel.send(noban)
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return msg.channel.send(noban)
        try {

            msg.guild.members.unban(bUser.user)

            const unbanned = new Discord.MessageEmbed()
                .setColor("#73DB6A")
                .setTitle("Successfully unbanned user "+ userID)
                .addFields(
                    { name: 'Moderator', value: msg.member.displayName, inline: true },
                )
                .setTimestamp()

            msg.channel.send(unbanned)

        } catch (e) {
            msg.channel.send(fail)
            console.log(e)
        }

    })

};