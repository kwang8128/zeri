const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', async message => {

    var text = message.content;

    if (text.includes('😂')) {

       message.reply(message.author);

       user = message.guild.member(message.author);

       if (user.bannable) {

          user.ban({ days: 7, reason: "bad emote"}).then(console.log).catch(console.error);

      } else {
          message.reply('F');
      }

     }

});

client.login(process.env.BOT_TOKEN);
