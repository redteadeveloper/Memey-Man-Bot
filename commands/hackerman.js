const Discord = require('discord.js');
const Canvas = require("canvas")
const bot = new Discord.Client();
exports.run = async (bot, msg, args) => {

    const canvas = Canvas.createCanvas(770, 433);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/hackerman.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(bot.users.cache.get(msg.author.id).displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 330, 60, 100, 100);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hackerman.jpg');

    msg.channel.send(attachment)

};
