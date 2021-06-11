const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', async message => {

    let text = message.content;
    //let server = message.guild;
    if (text.includes('😂')) {
        message.reply('A');
        //let user = message.author;
        /*
        message.reply('B');
        message.reply(typeof user);
        message.reply('C');
        message.channel.send("test");
        message.channel.send(server);
        message.reply('I');
        message.reply(message.author);
        message.reply(user);
        message.channel.send(server.member(message.author));
        message.reply('D');
        */
        message.reply(message.member);
        message.reply(typeof message.member.hasPermission('ADMINISTRATOR'));
        /*
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
        */

    }

});

client.login(process.env.BOT_TOKEN);
