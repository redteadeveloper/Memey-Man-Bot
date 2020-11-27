const Discord = require('discord.js');
const os = require('os')
const mongoose = require('mongoose')
const { inspect } = require('util');
exports.run = async (bot, msg, args) => {

    if (msg.author.id !== '611396886418685982') return;

    const args1 = msg.content.split(' ').slice(1); 
    const evalcmd = args1.join(' '); 

    let evaled;
    try {
        evaled = await eval(evalcmd);
        msg.channel.send("```yaml\n" + 
        inspect(evaled)
        + "\n```").catch(error => {
            msg.channel.send("Result too long, check logs.")
        });
        console.log("-- Inspection result --\n" + inspect(evaled) + "\n------------------------");
    }
    catch (error) {
        console.error(error);
        msg.reply('An error occurred during evaluation.');
        msg.channel.send("```" + error + "```").catch(error => {msg.channel.send("Error too long, chack logs.")})
    }

};