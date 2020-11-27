const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require('fs');
const mongoose = require('mongoose')

const bot = new Discord.Client();

bot.commands = new Enmap();

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true } )
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connecting', function () { console.log('MongoDB: Trying to connect to MongoDB');});
mongoose.connection.on('connected', function () { console.log('MongoDB: Successfully connected to MongoDB');});
mongoose.connection.on('error', function (err) { console.log('MongoDB: ERROR connecting to MongoDB' + ' - ' + err);});
mongoose.connection.on('close', function (err) { console.log('MongoDB: Connection closed' + ' - ' + err);});
mongoose.connection.on('reconnected', function () { console.log('MongoDB: Database link was reconnected');});
mongoose.connection.on('disconnected', function () { console.log('MongoDB: Connection ended');});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        bot.commands.set(commandName, props);
    });
});

function suffix(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
}

bot.on('guildMemberAdd', async member => {

    if (member.guild.id == `717895996155101244`) {

        const channel = member.guild.channels.cache.find(ch => ch.name == 'welcome-goodbye');

        const welcomeembed = new Discord.MessageEmbed()
            .setColor("#53dc98")
            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png'}))
            .setTitle("***Welcome to " + member.guild.name + "!***")
            .setThumbnail(member.guild.iconURL({ format: 'png' }))
            .setDescription(`<@!${member.user.id}>, Welcome to this server! You're the ${suffix(member.guild.memberCount)} member. Please check the <#717897434105118780> channel. Enjoy this server!`)
            .setTimestamp()

        channel.send(welcomeembed)

    } else if (member.guild.id == '749595288280498188') {

        const channel = member.guild.channels.cache.find(ch => ch.name == 'traffic');

        const welcomeembed = new Discord.MessageEmbed()
            .setColor("#53dc98")
            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png'}))
            .setTitle(member.guild.name + "에 온 것을 환영합니다")
            .setThumbnail(member.guild.iconURL({ format: 'png' }))
            .setDescription(`<@!${member.user.id}>이(가) ${member.guild.name}에 떨어졌습니다. 당신은 ${member.guild.memberCount}번째로 떨어지셨습니다. <#749615913413640202> 채널을 확인해 주세요.`)
            .setTimestamp()

        channel.send(welcomeembed)

    }
    
});

bot.on('guildMemberRemove', async member => {

    if (member.guild.id == `717895996155101244`) {

        let channel = member.guild.channels.cache.find(ch => ch.name == 'welcome-goodbye');

        let byeembed = new Discord.MessageEmbed()
            .setColor("#FF665B")
            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png'}))
            .setTitle(member.user.username + " left " + member.guild.name + ".")
            .setThumbnail(member.guild.iconURL({format: 'png'}))
            .setDescription(`<@!${member.user.id}> has left! Now we have ${member.guild.memberCount} members.`)
            .setTimestamp()

        channel.send(byeembed)

    } else if (member.guild.id == '749595288280498188') {

        let channel = member.guild.channels.cache.find(ch => ch.name == 'traffic');

        let byeembed = new Discord.MessageEmbed()
            .setColor("#FF665B")
            .setAuthor(member.user.tag, member.user.displayAvatarURL({format: 'png'}))
            .setTitle(member.user.username + "이(가) " + member.guild.name + "를 떠났습니다")
            .setThumbnail(member.guild.iconURL({format: 'png'}))
            .setDescription(`<@!${member.user.id}>가 떠났습니다. 남은 멤버는 ${member.guild.memberCount}명 입니다.`)
            .setTimestamp()

        channel.send(byeembed)

    }

});

bot.on("ready", () =>{
    console.log("Logged in / Online in " + bot.guilds.cache.size + " servers.");
    setInterval(async ()=>{
        await bot.user.setActivity(`&help | Watching ${bot.guilds.cache.size} servers 👀`, { type: "PLAYING" }); 
    }, 30000)
});

const guildprefix = mongoose.model('guildprefix', new mongoose.Schema({
    serverid: String,
    prefix: String
}));

const modlogs = mongoose.model('modlogs', new mongoose.Schema({
    serverid: String,
    type: String,
    date: String,
    reason: String,
    userid: String,
    modtag: String
}));

global.guildprefix = guildprefix
global.modlogs = modlogs

bot.on("message", async msg => {

    if (msg.author.bot) return;

    const prefixmap = await guildprefix.findOne({ serverid: msg.guild.id }) || { prefix: "&" }
    let prefix = prefixmap.prefix
    global.prefix = prefix

    if (msg.content == "<@!702068724957446145>") {
        msg.reply(`My prefix is ${prefix}`) 
    }

    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = bot.commands.get(command);

    if (cmd) {
        try {
            cmd.run(bot, msg, args);
        } catch (error) {
            console.log(error)

            const errorembed = new Discord.MessageEmbed()
                .setColor("#FF665B")
                .setTitle("An error occurred.")
                .setDescription("```" + error.message + "```")
                .setFooter("This error will be reported to bot developer.")

            msg.channel.send(errorembed)

            const errorembeddev = new Discord.MessageEmbed()
                .setColor("#FF665B")
                .setTitle("An error occurred while running command.")
                .addFields(
                    { name: "User input", value: "```" + msg.content + "```" },
                    { name: "Error", value: "```" + error + "```"}
                )
                .setFooter("Message ID: " + msg.id)

            bot.users.cache.get("611396886418685982").send(errorembeddev)
        }
    }
})

bot.login(process.env.TOKEN);
