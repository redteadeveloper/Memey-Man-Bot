const Discord = require('discord.js');
exports.run = (bot, msg, args) => {

    const noperm = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle("Missing permissions")
        .setDescription("You need ``Manage messages`` permission to use this command.")

    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(noperm)

    const nochannel = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle("Invalid argument")
        .setDescription(prefix + "poll [channel mention] [poll content]")
        .setFooter("You didn't provide a channel to post the poll.")

    const notitle = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle("Invaild argument")
        .setDescription(prefix + "poll [channel mention] [poll content]")
        .setFooter("You didn't provide the poll content.")

    const args1 = msg.content.split(' ').slice(2); 
    const votetitle = args1.join(' '); 
    let mention = msg.mentions.channels.first();
    if(!mention) return msg.channel.send(nochannel)
    if(!votetitle) return msg.channel.send(notitle)

    const voteEmbed = new Discord.MessageEmbed()
        .setColor(`#FFC0CB`)
        .setTitle( `**Poll by ${msg.member.displayName}**` )
        .setDescription(votetitle)
        .setFooter("React to vote!")
        .setTimestamp()

    mention.send(voteEmbed).then(sentEmbed => {
        sentEmbed.react("👍")
        .then(() => sentEmbed.react("👎"))
        msg.react('✅')
    });
    
};