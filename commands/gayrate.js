const Discord = require('discord.js');
exports.run = (bot, msg, args) => {

    const member = msg.mentions.members.first();
    const rate = Math.random() * (100);
    
    if (!member) {

        const rateembed = new Discord.MessageEmbed()
            .setColor("#cccccc")
            .setTitle("Gayrate :rainbow_flag:")
            .setDescription(`You are ${Math.floor(rate)}% gay!`)

        msg.channel.send(rateembed)

    } else if (member) {

        const memberrateembed = new Discord.MessageEmbed()
            .setColor("#cccccc")
            .setTitle("Gayrate :rainbow_flag:")
            .setDescription(`${member.displayName} is ${Math.floor(rate)}% gay!`)
       
        msg.channel.send(memberrateembed)

    }

};
