const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = (bot, msg, args) => {

    function checkURL(url) {
        return(String(url).match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    if (msg.channel.nsfw == false) {

        async function fetchRedditData() {

            const res = await fetch("https://www.reddit.com/r/cleanmemes/random.json");
            const data = await res.json();
        
            const url = data[0].data.children[0].data.url
            const title = data[0].data.children[0].data.title
            const author = data[0].data.children[0].data.author
    
            if(checkURL(url) == false) {
    
                await fetchRedditData()
    
            } else {
    
                const meme = new Discord.MessageEmbed()
                    .setColor("#7cfc00")
                    .setTitle(title)
                    .setImage(url)
                    .setFooter(`Meme by u/${author}`)
    
                return msg.channel.send(meme)
    
            }
    
        }
        
        fetchRedditData()
        
    } else {

        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {

            const memeembed = new Discord.MessageEmbed()
                .setColor('#7cfc00')
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`Subreddit: r/${json.subreddit}`)   

            msg.channel.send(memeembed)   

        });

    }

};
