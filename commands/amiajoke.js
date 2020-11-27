const Discord = require('discord.js');
const Canvas = require('canvas');
exports.run = async (bot, msg, args) => {

    const canvas = Canvas.createCanvas(897, 601);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/amiajoke.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(bot.users.cache.get(msg.author.id).displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 480, 50, 330, 330);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'amiajoke.jpg');

    msg.channel.send(attachment)

};
