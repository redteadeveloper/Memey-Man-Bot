const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = (bot, msg, args) => {

    fetch('https://api.alexflipnote.dev/cats')
    .then(res => res.json())
    .then(json => {

        const catembed = new Discord.MessageEmbed()
            .setColor('#8B4513')
            .setTitle(":cat: Cat image!")
            .setImage(json.file)

        msg.channel.send(catembed)

    });

};