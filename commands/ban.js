const Discord = require('discord.js');
exports.run = async (bot, msg, args) => {

    if (msg.channel.type == "dm") return;
    
    const args1 = msg.content.split(' ').slice(2); 
    const banreason = args1.join(' '); 
    const banmember= msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);

    const noperm1 = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Missing permissions')
        .setDescription("You need ``Ban members`` permission to use this command.")

    const nomemberembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "ban [member mention] [ban reason]")
        .setFooter("You didn't provide a member to ban.")

    const noreasonembed = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Invalid argument')
        .setDescription(prefix + "ban [member mention] [ban reason]")
        .setFooter("You didn't provide a ban reason.")

    const cantban = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Couldn\'t ban member.')
        .setDescription("Failed to ban member.")

    const cantbandb = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle('Couldn\'t save ban to modlogs')
        .setDescription("Failed to save this ban to modlogs.")

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(noperm1)
    if(!banmember) return msg.channel.send(nomemberembed)
    if(!banreason) return msg.channel.send(noreasonembed)

    const banembed = new Discord.MessageEmbed()
        .setColor('#73DB6A')
        .setTitle('Successfully banned ' + banmember.user.tag)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: banreason, inline: true },
        )
        .setTimestamp()

    const dmbanembed = new Discord.MessageEmbed()
        .setColor('#FFB347')
        .setTitle(`You have been banned from ${msg.guild.name}`)
        .addFields(
            { name: 'Moderator', value: msg.author.tag, inline: true },
            { name: 'Reason', value: banreason, inline: true },
        )
        .setTimestamp()

    let banuser = banmember.user
    let fail = 0

    try {
        await banmember.ban(banreason)
    } catch (error) {
        msg.channel.send(cantban)
        fail = 1
    }

    if (fail == 1) return

    try {
        await new modlogs({ 
            serverid: msg.guild.id,
            type: "Ban",
            date: Date.now().toString(),
            reason: banreason,
            userid: banuser.id,
            modtag: msg.author.tag
        }).save();
    } catch (error) {
        msg.channel.send(cantbandb)
        console.log(error)
    }

    try {
        msg.channel.send(banembed)
        banuser.send(dmbanembed)
    } catch (error) {}
    
}