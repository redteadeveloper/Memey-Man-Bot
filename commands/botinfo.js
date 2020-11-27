const Discord = require('discord.js');
const bot = new Discord.Client();
exports.run = (bot, msg, args) => {

    const ram = process.memoryUsage().heapUsed / 1024 / 1024

    const infoEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bot information')
        .setThumbnail('https://i.imgur.com/XiiqQWn.png')
        .addFields(
            { name: 'Bot name', value: 'Memey Man', inline: true },
            { name: 'Developer', value: 'RedTea#8520', inline: true },
            { name: 'Bot prefix', value: prefix, inline: true}
        )
        .addFields(
            { name: 'Server count', value: bot.guilds.cache.size + " servers", inline: true },
            { name: 'User count', value: bot.users.cache.size + " users", inline: true},
            { name: "RAM", value: `${Math.round(ram * 100) / 100}MB`, inline: true}
        )
        .setFooter('Type ' + prefix + 'help to get help!')
        .setTimestamp()

    msg.channel.send(infoEmbed);

};
