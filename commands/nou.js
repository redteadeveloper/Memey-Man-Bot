const Discord = require('discord.js');
const Canvas = require('canvas');
exports.run = async (bot, msg, args) => {

    const canvas = Canvas.createCanvas(640, 454);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/nou.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(bot.users.cache.get(msg.author.id).displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 37, 80, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'nou.jpg');

    msg.channel.send(attachment)
    
};