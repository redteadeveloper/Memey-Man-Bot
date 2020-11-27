const Discord = require('discord.js')
const { ReactionCollector } = require('discord.js-collector')
exports.run = async (bot, msg, args) => {

	const embed = new Discord.MessageEmbed()
            .setColor("#0D98BA")
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription("Add a reaction to one of these emojis to play!")

    const botMessage = await msg.channel.send(embed);

    ReactionCollector.question({
        botMessage,
        user: msg.author,
        reactions: {
            '✌️': async () => getres(1),
            '✊': async () => getres(2),
            '🖐️': async () => getres(3),
        },
        deleteAllOnEnd: true
    });

    function getres(userinput) {

        const choices = [1, 2, 3];

        const random = Math.floor(Math.random() * choices.length);
        const botChoice = choices[random];

        const result = getResult(userinput, botChoice);

        embed
            .setTitle(result)
            .setDescription(`${numres(userinput)} VS ${numres(botChoice)}`)

        botMessage.edit(embed);

        function getResult(me, clientChosen) {
            if ((me == 1 && clientChosen == 3) ||
                (me == 2 && clientChosen == 1) ||
                (me == 3 && clientChosen == 2)) {
                    return "You won!";
            } else if (me == clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }

        function numres(a) {
            if(a == 1) return "✌️";
            if(a == 2) return "✊";
            if(a == 3) return "🖐️";
        }
    }

};