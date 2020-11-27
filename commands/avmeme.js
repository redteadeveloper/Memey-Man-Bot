const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (bot, msg, args) => {

    function checkURL(url) {
        return(String(url).match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    async function fetchRedditData() {

        const res = await fetch("https://www.reddit.com/r/aviationmemes/random.json");
        const data = await res.json();
    
        const url = data[0].data.children[0].data.url
        const title = data[0].data.children[0].data.title

        if(checkURL(url) == false) {

            await fetchRedditData()

        } else {

            const avmeme = new Discord.MessageEmbed()
                .setColor("#7cfc00")
                .setTitle(title)
                .setImage(url)

            return msg.channel.send(avmeme)

        }

    }
    
    fetchRedditData()

};