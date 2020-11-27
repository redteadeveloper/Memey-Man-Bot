const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = async (bot, msg, args) => {

    const nosearch = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription(prefix + "wiki [search word]")
        .setFooter("You didn't provide a search word.")

    const args1 = msg.content.split(' ').slice(1);
    const search = args1.join('_');

    if (!search) return msg.channel.send(nosearch)

    const searchword = encodeURI(search)

    const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + searchword);
    const data = await res.json();

    const title = data.title;
    const text = data.extract || "Couldn't retrieve any result. Try searching case sensitively.";

    let thumbnail

    if (data.originalimage) {
        thumbnail = data.originalimage.source;
    } else {
        thumbnail = null
    }

    let url

    if (data.content_urls) {
        url = data.content_urls.desktop.page
    } else {
        url = null
    }

    const jokeembed = new Discord.MessageEmbed()
        .setColor(`#009900`)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription(text)
        .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")

    await msg.channel.send(jokeembed)

};