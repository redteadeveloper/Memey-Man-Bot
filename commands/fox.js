const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = (bot, msg, args) => {

    fetch('https://randomfox.ca/floof/?ref=public-apis')
    .then(res => res.json())
    .then(json => {

        const foxembed = new Discord.MessageEmbed()
            .setColor('#8B4513')
            .setTitle(":fox: Fox image!")
            .setImage(json.image)

        msg.channel.send(foxembed)

    });

};
