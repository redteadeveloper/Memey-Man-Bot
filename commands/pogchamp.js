const Discord = require('discord.js');
const Canvas = require('canvas');
exports.run = async (bot, msg, args) => {

    const canvas = Canvas.createCanvas(700, 394);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/pogchamp.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(bot.users.cache.get(msg.author.id).displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 270, 100, 170, 170);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'pogchamp.jpg');

    await msg.channel.send(attachment)
    
};