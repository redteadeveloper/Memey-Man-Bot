const Discord = require('discord.js')
const nodeyourmeme = require('nodeyourmeme')

exports.run = async (bot, msg, args) => {
    
    const nosearch = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "kymeme [search word]")
        .setFooter("You didn't provide a search word.")

    const memenores = new Discord.MessageEmbed()
        .setColor("#779ECB")
        .setTitle("Not found.")
        .setDescription("Couldn't retrieve any result.")

    const args1 = msg.content.split(' ').slice(1);
    const search = args1.join(' ');

    if (!search) return msg.channel.send(nosearch)

    try {
        var res = await nodeyourmeme.search(search)
    } catch (error) {
        
    }

    if(!res) return msg.channel.send(memenores)

    const meme = new Discord.MessageEmbed()
        .setColor("#009900")
        .setTitle(res.name)
        .setDescription(res.about)
        .setFooter("Powered by Know Your Meme", "https://i.ibb.co/yPBq1x5/kymeme.png")

    msg.channel.send(meme)

};