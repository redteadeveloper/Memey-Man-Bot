const Discord = require('discord.js');
exports.run = (bot, msg, args) => {

    let user = msg.mentions.members.first();

    const huge = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + 'hug [member mention]')
        .setFooter('You didn\'t provide a member to hug.')

    if (!user) return msg.channel.send(huge)
    
    const hugee = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle( msg.member.displayName + " :hugging: " + user.displayName )
        .setDescription( msg.author.toString() + ' hugged ' + user.toString() + "!" )
   
    msg.channel.send(hugee)

};
