const Discord = require('discord.js');
exports.run = async (bot, msg, args) => {

    if (msg.channel.type == "dm") return;
    
    const args1 = msg.content.split(' ').slice(2); 
    const caseid = args1.join(' '); 
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);

    const noperm1 = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Kick members`` permission to use this command.")

    const nomemberembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "clearmodlog [member mention] [case ID]")
        .setFooter("You didn't provide a member to delete modlog.")

    const noidembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "clearmodlog [member mention] [case ID]")
        .setFooter("You didn't provide a case ID.")

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noperm1)
    if(!member) return msg.channel.send(nomemberembed)
    if(!caseid) return msg.channel.send(noidembed)

    const successembed = new Discord.MessageEmbed()
        .setColor('#73DB6A')
        .setTitle('Successfully deleted modlog')
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Member', value: member.user.tag, inline: true },
            { name: 'Case ID', value: caseid },
        )
        .setTimestamp()

    modlogs.findByIdAndRemove(caseid, function (err) { 
        if (err) { 
            msg.channel.send("Failed.")
            console.log(err) 
        } else { 
            msg.channel.send(successembed)
        } 
    });

}