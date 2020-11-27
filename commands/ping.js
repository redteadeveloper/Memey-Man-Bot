const Discord = require('discord.js');
const bot = new Discord.Client();
exports.run = async (bot, msg, args) => {

    const m = msg.channel.send("Please wait...")
    .then((m) => m.edit(`Latency: ${m.createdTimestamp - msg.createdTimestamp}ms\nAPI latency: ${bot.ws.ping}ms`))
    
};