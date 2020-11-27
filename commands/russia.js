const Discord = require('discord.js');
const Canvas = require('canvas');
exports.run = async (bot, msg, args) => {
    
    const canvas = Canvas.createCanvas(608, 342);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/russia.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(bot.users.cache.get(msg.author.id).displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 430, 122, 70, 70);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'russia.jpg');

    msg.channel.send(attachment)

};