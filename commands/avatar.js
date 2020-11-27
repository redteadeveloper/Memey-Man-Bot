const Discord = require('discord.js');
exports.run = (bot, msg, args) => {

    const user = msg.mentions.users.first()
    const arguments = msg.content.split(' ').slice(1); 
    const memberid = arguments.join(' '); 

    if (!memberid && !user) {
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(`#006a4e`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setImage(msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
        msg.channel.send(avatarEmbed);
    }

    if (user) {
        const useravatarEmbed = new Discord.MessageEmbed()            
            .setColor(`#006a4e`)
            .setAuthor(user.tag, user.displayAvatarURL({ format: 'png', dynamic:true }))
            .setImage(user.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
        msg.channel.send(useravatarEmbed);
    }

    if (memberid && !user && msg.guild.member(memberid)) {
        const idavatarEmbed = new Discord.MessageEmbed() 
            .setColor(`#006a4e`)
            .setAuthor(bot.users.cache.get(memberid).tag, bot.users.cache.get(memberid).displayAvatarURL({ format: 'png' }))
            .setImage(bot.users.cache.get(memberid).displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
        msg.channel.send(idavatarEmbed);
    } 

    if(memberid && !user && !msg.guild.member(memberid) ) return msg.channel.send(":x: No results found.")

};