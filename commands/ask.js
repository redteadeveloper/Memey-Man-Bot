const Discord = require("discord.js")
const WolframAlphaAPI = require('wolfram-alpha-node');

const waApi = WolframAlphaAPI(process.env.WOLFRAM);

exports.run = (bot, msg, args) => {

    const args1 = msg.content.split(' ').slice(1);
    const question = args1.join(' ');

    let answer

    (async() => {
        try {
            msg.channel.startTyping()
            answer = await waApi.getSpoken(question)
        } catch (e) {
            const resultembedn = new Discord.MessageEmbed()
                    .setColor("#F9A602")
                    .setTitle("Error!")
                    .setDescription("Wolfram Alpha didn't understand your question.")

            msg.channel.send(resultembedn)
            msg.channel.stopTyping()    
            return
        }
        const answerembed = new Discord.MessageEmbed()
            .setColor("#009900")
            .setTitle("Answer")
            .setDescription(answer)
            .setFooter("Powered by Wolfram Alpha", "https://i.ibb.co/TrFWq8d/wolframalpha.png")

        msg.channel.send(answerembed)
        msg.channel.stopTyping()
    })()

};