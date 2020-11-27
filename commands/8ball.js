const Discord = require('discord.js');
exports.run = (bot, msg, args) => {

    const args1 = msg.content.split(' ').slice(1); 
    const question = args1.join(' '); 

    var answers = ["Yes.",
                 "Ask me later.", 
                 "No.", 
                 "I don't know",
                 "Of course.",
                 "Never.", 
                 "Maybe.",
                 "Hmm...",
                 "Excuse me?"];

    var answer = Math.floor(Math.random() * answers.length);
 
    const ballembed = new Discord.MessageEmbed()
        .setColor('#9c51b6')
        .setTitle('**8ball**')
        .setDescription( '**Your question**: ' + question + '\n**My answer**: ' + answers[answer] )
        .setTimestamp() 

    msg.channel.send(ballembed);

};
