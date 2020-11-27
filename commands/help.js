const Discord = require('discord.js');
const { ReactionCollector } = require("discord.js-collector");
exports.run = async (bot, msg, args) => {

    const botMessage = await msg.channel.send('``React to view my commands!``')
    ReactionCollector.menu({
        botMessage,
        user: msg,
        pages: {

            '😄': {
                embed: {
                    color: "#1167b1",
                    title: "Fun commands",
                    description: '``meme`` Gets a random meme.\n``dadjoke`` Gets a random dad joke.\n``avmeme`` Gets a random aviation meme.\n``gayrate`` See how gay is someone\n``hug`` Hug a user!\n``punch`` Punch a user!\n``rps`` Play rock paper scissors!\n``topic`` Gives a chat topic',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            },

            '🛠️': {
                embed: {
                    color: "#1167b1",
                    title: "Tool commands",
                    description: '``ping`` Gets bot ping.\n``prefix`` Sets bot prefix.\n``avatar`` Gives user\'s avatar.\n``ask`` Ask anything to the bot.\n``math`` Calculates an equation.\n``translate`` Translates text to English.\n``poll`` Creates a poll.\n``serverinfo`` Gives server info.',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            },

            '🔍': {
                embed: {
                    color: "#1167b1",
                    title: "Search commands",
                    description: '``wiki`` Searches something on Wikipedia.\n``urban`` Searches something on urban dictionary.\n``kymeme`` Searches something on Know Your Meme.\n``imgsearch`` Searches image on Google.',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            },

            '🎨': {
                embed: {
                    color: "#1167b1",
                    title: "Image commands",
                    description: '``dog`` Gives a dog image.\n``cat`` Gives a cat image.\n``fox`` Gives a fox image.\n``bird`` Gives a bird image.\n``draw`` Creates an image.\n``supreme`` Puts given text into Supreme logo.\n``amiajoke`` Am I a joke to you image with your pfp.\n``pogchamp`` Pogchamp image with your pfp.\n``nou`` No u image with your pfp.\n``russia`` Mother Russia!\n``hackerman`` Hackerman image with your pfp.',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            },

            '🔤': {
                embed: {
                    color: "#1167b1",
                    title: "Text commands",
                    description: '``encode`` Encodes given text.\n``decode`` Decodes given text.\n``embed`` Puts given text in an embed.\n``xue`` Xue hua piao piao bei feng piao piao',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            },

            '🔨': {
                embed: {
                    color: "#1167b1",
                    title: "Moderator commands",
                    description: '``ban`` Bans a user.\n``unban`` Unbans a user.\n``kick`` Kicks a user.\n``warn`` Warns a user.\n``mute`` Mutes a user.\n``unmute`` Unmutes a user.\n``modlogs`` Shows a user\'s modlogs.\n``clearmodlog`` Removes a modlog.\n``purge`` Deletes messages.\n``slowmode`` Sets slowmode.',
                    footer: {
                        iconURL: "https://i.imgur.com/XiiqQWn.png",
                        text: "This server's prefix is " + prefix
                    }
                }
            }

        }

    });

};
