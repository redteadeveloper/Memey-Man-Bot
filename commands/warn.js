const Discord = require('discord.js');
exports.run = async (bot, msg, args) => {

    if (msg.channel.type == "dm") return;
    
    const args1 = msg.content.split(' ').slice(2); 
    const reason = args1.join(' '); 
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);
    
    const noperm1 = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Kick members`` permission to use this command.")

    const nomemberembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "warn [member mention] [warn reason]")
        .setFooter("You didn't provide a member to warn.")

    const noreasonembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "warn [member mention] [warn reason]")
        .setFooter("You didn't provide a warn reason.")

    const cantwarn = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Couldn\'t warn member.')
        .setDescription("Failed to warn member.")

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noperm1)
    if(!member) return msg.channel.send(nomemberembed)
    if(!reason) return msg.channel.send(noreasonembed)

    const warnembed = new Discord.MessageEmbed()
        .setColor('#73DB6A')
        .setTitle('Successfully warned ' + member.user.tag)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: reason, inline: true },
        )
        .setTimestamp()

    const dmwarnembed = new Discord.MessageEmbed()
        .setColor('#FFB347')
        .setTitle(`You have been warned on ${msg.guild.name}`)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: reason, inline: true },
        )
        .setTimestamp()

    let user = member.user

    try {
        await new modlogs({ 
            serverid: msg.guild.id,
            type: "Warn",
            date: Date.now().toString(),
            reason: reason,
            userid: user.id,
            modtag: msg.author.tag
        }).save();
    } catch (error) {
        msg.channel.send(cantwarn)
        console.log(error)
        return
    }

    try {
        msg.channel.send(warnembed)
        user.send(dmwarnembed)
    } catch (error) {}
    
}