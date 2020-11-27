const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = (bot, msg, args) => {

    fetch('https://api.alexflipnote.dev/birb')
    .then(res => res.json())
    .then(json => {

        const birdembed = new Discord.MessageEmbed()
            .setColor('#8B4513')
            .setTitle(":bird: Bird image!")
            .setImage(json.file)

        msg.channel.send(birdembed)

    });

};