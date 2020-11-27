const Discord = require("discord.js")
exports.run = async (bot, msg, args) => {

    const args1 = msg.content.split(' ').slice(1);
    const newprefix = args1.join(' ');

    const noperm = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Manage guild`` permission to use this command.")

    if(!newprefix) return msg.channel.send("Current prefix is ``"+ prefix + "``")

    if(!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send(noperm)

    const test = await guildprefix.findOne({ serverid: msg.guild.id })

    if (test == null) {
        await new guildprefix({ serverid: msg.guild.id, prefix: newprefix }).save();
    } else {
        await guildprefix.updateOne({ serverid: msg.guild.id }, { prefix: newprefix });
    }

    const setprefix = await guildprefix.findOne({ serverid: msg.guild.id })

    const prefixembed = new Discord.MessageEmbed()
        .setColor(`#0859C6`)
        .setTitle(`Successfully set prefix`)
        .setDescription("The new prefix is ``" + setprefix.prefix + "``")

    await msg.channel.send(prefixembed)

};