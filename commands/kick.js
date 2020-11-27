const Discord = require('discord.js');
exports.run = async (bot, msg, args) => {

    if (msg.channel.type == "dm") return;
    
    const args1 = msg.content.split(' ').slice(2); 
    const kickreason = args1.join(' '); 
    const kickmember= msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);

    const noperm = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Kick members`` permission to use this command.")
    
    const nomemmber = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "kick [member mention] [ban reason]")
        .setFooter("You didn't provide a member to kick.")

    const noreason = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "kick [member mention] [ban reason]")
        .setFooter("You didn't provide a kick reason.")

    const cantkick = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Couldn\'t kick member')
        .setDescription("Failed to kick member.")

    const cantkickdb = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Couldn\'t save kick to modlogs')
        .setDescription("Failed to save this kick to modlogs.")

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noperm);
    if(!kickmember) return msg.channel.send(nomemmber)
    if(!kickreason) return msg.channel.send(noreason)

    const kickembed = new Discord.MessageEmbed()
        .setColor('#73DB6A')
        .setTitle('Successfully kicked ' + kickmember.user.tag)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: kickreason, inline: true },
        )
        .setTimestamp()

    const dmkickembed = new Discord.MessageEmbed()
        .setColor('#FFB347')
        .setTitle(`You have been kicked from ${msg.guild.name}`)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: kickreason, inline: true },
        )
        .setTimestamp()

    let kickuser = kickmember.user
    let fail = 0

    try {
        await kickmember.kick(kickreason)
    } catch (error) {
        msg.channel.send(cantkick)
        fail = 1
    }

    if (fail == 1) return

    try {
        await new modlogs({ 
            serverid: msg.guild.id,
            type: "Kick",
            date: Date.now().toString(),
            reason: kickreason,
            userid: kickuser.id,
            modtag: msg.author.tag
        }).save();
    } catch (error) {
        msg.channel.send(cantkickdb)
        console.log(error)
    }

    try {
        msg.channel.send(kickembed)
        kickuser.send(dmkickembed)
    } catch (error) {}

}