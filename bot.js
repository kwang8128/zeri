const Discord = require('discord.js');
const CalendarChinese = require('date-chinese').CalendarChinese;
const julian = require('astronomia/julian');
//const config = require('./config.json');
const client = new Discord.Client();

var year;
var month;
var day;
var hour;
var HS;
var EB;

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    let text = message.content;
    if (text.charAt(0) == '!') {
        year = parseInt(text.slice(1, 5));
        month = parseInt(text.slice(5, 7));
        day = parseInt(text.slice(7, 9));
        hour = parseInt(text.slice(9, 11));
        let cal = new CalendarChinese();
        cal.fromGregorian(year, month, day);
        response = bazi(cal);
        message.reply('\nๅนดๆๆฅๆ\n' + response);
    }
    if (text.includes('๐')) {
        let user = message.member;
        if (user.bannable) {
            user.ban({
                days: 7,
                reason: "bad emote"
            }).then(console.log).catch(console.error);
        } else {
            message.reply('please don\'t use this emote again');
        }
    }
});

client.on('messageReactionAdd', (messageReaction, user) => {
    let emote = messageReaction.emoji.toString();
    if (emote == '๐') {
        //code errors next line:
        //message.reply(message.member);
        //let user = message.author;
        if (user.bannable) {
            user.ban({
                days: 7,
                reason: "bad emote"
            }).then(console.log).catch(console.error);
        } else {
            messageReaction.message.channel.send(user + ', please don\'t use this emote again');
        }
    }
});

function bazi(cal) {
    let yearHS = (cal.year + 9) % 10 + 1;
    let yearHSChinese = getHSChinese(yearHS);
    let yearEB = (cal.year + 11) % 12 + 1;
    let yearEBChinese = getEBChinese(yearEB);
    let monthEB = (cal.month + 1) % 12 + 1;
    let monthEBChinese = getEBChinese(monthEB);
    let monthHS = (yearHS*2 + monthEB + 7) % 10 + 1;
    let monthHSChinese = getHSChinese(monthHS);
    let jd = Math.floor(julian.CalendarGregorianToJD(year, month, day));
    let day60 = (jd + 51) % 60;
    if (hour == 23) {
        day60 = (day60 + 1) % 60;
    }
    let dayHS = (day60 + 9) % 10 + 1;
    let dayHSChinese = getHSChinese(dayHS);
    let dayEB = (day60 + 11) % 12 + 1;
    let dayEBChinese = getEBChinese(dayEB);
    let dhourEB = Math.ceil(hour/2) % 12 + 1;
    let dhourEBChinese = getEBChinese(dhourEB);
    let dhourHS = (dayHS*2 + dhourEB + 7) % 10 + 1;
    let dhourHSChinese = getHSChinese(dhourHS);
    console.log("ๅนดๆๆฅๆ");
    HS = yearHSChinese + monthHSChinese + dayHSChinese + dhourHSChinese;
    EB = yearEBChinese + monthEBChinese + dayEBChinese + dhourEBChinese;
    return HS + '\n' + EB;
}

function getHSChinese(num) {
    switch (num) {
        case 1:
            return '็ฒ';
            break;
        case 2:
            return 'ไน';
            break;
        case 3:
            return 'ไธ';
            break;
        case 4:
            return 'ไธ';
            break;
        case 5:
            return 'ๆ';
            break;
        case 6:
            return 'ๅทฑ';
            break;
        case 7:
            return 'ๅบ';
            break;
        case 8:
            return '่พ';
            break;
        case 9:
            return 'ๅฃฌ';
            break;
        case 10:
            return '็ธ';
            break;
        default:
            console.log('error');
    }
}

function getEBChinese(num) {
    switch (num) {
        case 1:
            return 'ๅญ';
            break;
        case 2:
            return 'ไธ';
            break;
        case 3:
            return 'ๅฏ';
            break;
        case 4:
            return 'ๅฏ';
            break;
        case 5:
            return '่พฐ';
            break;
        case 6:
            return 'ๅทณ';
            break;
        case 7:
            return 'ๅ';
            break;
        case 8:
            return 'ๆช';
            break;
        case 9:
            return '็ณ';
            break;
        case 10:
            return '้';
            break;
        case 11:
            return 'ๆ';
            break;
        case 12:
            return 'ไบฅ';
            break;
        default:
            console.log('error');
    }
}

client.login(process.env.BOT_TOKEN);
//client.login(config.token);
