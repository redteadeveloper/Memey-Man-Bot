const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = (bot, msg, args) => {

	async function fetchRedditData() {

        const res = await fetch("https://www.reddit.com/r/dadjokes/random.json");
        const data = await res.json();
    
        const title = data[0].data.children[0].data.title
        const text = data[0].data.children[0].data.selftext
        const author = data[0].data.children[0].data.author

        const jokeembed = new Discord.MessageEmbed()
            .setColor(`#9c51b6`)
            .setAuthor(title)
            .setDescription(text)
            .setFooter(`Post by u/${author}`)

        await msg.channel.send(jokeembed)

    }
    
    fetchRedditData()

};