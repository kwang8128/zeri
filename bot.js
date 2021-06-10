const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', async message => {

    var text = message.content;
    if (text.includes('😂')) {
        message.reply('A');
        var user = message.guild.member(message.author);
        message.reply('B');
        message.reply(typeof user);
        message.reply('C');
        message.channel.send("test");
        message.channel.send(user.toString());
        message.reply('D');
        message.reply(typeof user.bannable);
        message.reply('E');
        var bannable = new Boolean(user.bannable);
        message.reply('F');
        message.reply(bannable.prototype.toString());
        message.reply('G');

        if (user.bannable) {
            message.reply('B');
            user.ban({
                days: 7,
                reason: "bad emote"
            }).then(console.log).catch(console.error);

        } else {
            message.reply('F');
        }

    }

});

client.login(process.env.BOT_TOKEN);
