const Discord = require('discord.js')
const { evalExpression } = require('@hkh12/node-calc');
exports.run = (bot, msg, args) => {

    const noe = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "math [equation]")
        .setFooter("You didn't provide an equation.")

    const inve = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "math [equation]")
        .setFooter("You provided an invalid equation.")

    const args1 = msg.content.split(' ').slice(1);
    const equation = args1.join(' ');

    if (!equation) return msg.channel.send(noe)

    let result

    try {
        result = evalExpression(equation)
    } catch (error) {
        msg.channel.send(inve)

        return
    }

    if (result == "Infinity" || result == "NaN" ) {

        const infinity = new Discord.MessageEmbed()
            .setColor("#B399D4")
            .setTitle("YOU BROKE THE UNIVERSE!!!")
            .setImage("https://thumbs.gfycat.com/PerkyGloriousFlatfish-size_restricted.gif")
            .setDescription('AAAAA LOOK AT WHAT YOU\'VE DONE!!!')

        return msg.channel.send(infinity)

    }

    const calc = new Discord.MessageEmbed()
        .setColor("#B399D4")
        .setTitle("Calculation result")
        .setDescription(result)

    msg.channel.send(calc)

};