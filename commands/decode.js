const Discord = require("discord.js")
const ascii85 = require('ascii85');
exports.run = (bot, msg, args) => {

    var arguments = msg.content.split(" ").slice(1)
    var text = arguments.join(" ")

    const not = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "decode [text]")
        .setFooter("You didn't provide a text to decode.")

    if(!text) return msg.channel.send(not)

    var decoded = ascii85.decode(text)

    const result = new Discord.MessageEmbed()
        .setColor("#016064")
        .setTitle("Result")
        .setDescription(decoded.toString())

    msg.channel.send(result)

};