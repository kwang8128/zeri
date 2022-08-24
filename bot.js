const Discord = require('discord.js');
const CalendarChinese = require('date-chinese').CalendarChinese;
const julian = require('astronomia/julian');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const client = new Discord.Client();

var year;
var month;
var day;
var hour;
var HS;
var EB;

// '☷'; '☳'; '☵'; '☱'; '☶'; '☲'; '☴'; '☰';
// '☷' '☶' '☵' '☴' '☳' '☲' '☱' '☰'

const trigramArray = [0, 7, 3, 5, 1, 6, 2, 4];
const hexLookup = {
    '☷': {'☷': '䷁', '☵': '䷖', '☵': '䷇', '☴': '䷓', '☳': '䷏', '☲': '䷢', '☱': '䷬', '☰': '䷋'},
    '☶': {'☷': '䷎', '☵': '䷳', '☵': '䷦', '☴': '䷴', '☳': '䷽', '☲': '䷷', '☱': '䷞', '☰': '䷠'},
    '☵': {'☷': '䷆', '☵': '䷃', '☵': '䷜', '☴': '䷺', '☳': '䷧', '☲': '䷿', '☱': '䷮', '☰': '䷅'},
    '☴': {'☷': '䷭', '☵': '䷑', '☵': '䷯', '☴': '䷸', '☳': '䷟', '☲': '䷱', '☱': '䷛', '☰': '䷫'},
    '☳': {'☷': '䷗', '☵': '䷚', '☵': '䷂', '☴': '䷩', '☳': '䷲', '☲': '䷔', '☱': '䷐', '☰': '䷘'},
    '☲': {'☷': '䷣', '☵': '䷕', '☵': '䷾', '☴': '䷤', '☳': '䷶', '☲': '䷝', '☱': '䷰', '☰': '䷌'},
    '☱': {'☷': '䷒', '☵': '䷨', '☵': '䷻', '☴': '䷼', '☳': '䷵', '☲': '䷥', '☱': '䷹', '☰': '䷉'},
    '☰': {'☷': '䷊', '☵': '䷙', '☵': '䷄', '☴': '䷈', '☳': '䷡', '☲': '䷍', '☱': '䷪', '☰': '䷀'}
}

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
        message.reply('\n年月日時\n' + response);
    }
    if (text.charAt(0) == '#') {
        const numArray = text.split(' ');
        let lower = numArray[0].slice(1);
        let upper = numArray[1];
        let changing;
        let chHexagram;
        let currCh;
        if (numArray.length == 2) {
            changing = parseInt(lower) + parseInt(upper);
        } else {
            changing = numArray[2];
        }
        let hexagram = getHexagram(getTrigram(trigramArray[upper%8]), getTrigram(trigramArray[lower%8]));
        let hexagramNum = hexagram.charCodeAt(0) - '䷀'.charCodeAt(0) + 1;
        let changingLine = changing%6;
        if (changingLine == 0) {
            changingLine = 6;
        }
        currCh = changingLine;
        if (changingLine > 3) {
            currCh = changingLine - 3;
            chHexagram = getHexagram(getTrigram(trigramArray[upper%8] ^ 1 << currCh - 1), getTrigram(trigramArray[lower%8]));
        } else {
            chHexagram = getHexagram(getTrigram(trigramArray[upper%8]), getTrigram(trigramArray[lower%8] ^ 1 << currCh - 1));
        }
        message.reply(
`Your Hexagram:
${hexagram}
https://ctext.org/book-of-changes#:~:text=${hexagramNum}
Changing Line: ${changingLine}

Changing Hexagram:
${chHexagram}`);
    }
    if (text.includes('😂')) {
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
    if (emote == '😂') {
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

function getHexagram(upper, lower) {
    return hexLookup[lower][upper];
}

function getTrigram(num) {
    switch (num) {
        case 0:
            return '☷';
            break;
        case 1:
            return '☳';
            break;
        case 2:
            return '☵';
            break;
        case 3:
            return '☱';
            break;
        case 4:
            return '☶';
            break;
        case 5:
            return '☲';
            break;
        case 6:
            return '☴';
            break;
        case 7:
            return '☰';
            break;
        default:
            console.log('error');
    }
}

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
    console.log("年月日時");
    HS = yearHSChinese + monthHSChinese + dayHSChinese + dhourHSChinese;
    EB = yearEBChinese + monthEBChinese + dayEBChinese + dhourEBChinese;
    return HS + '\n' + EB;
}

function getHSChinese(num) {
    switch (num) {
        case 1:
            return '甲';
            break;
        case 2:
            return '乙';
            break;
        case 3:
            return '丙';
            break;
        case 4:
            return '丁';
            break;
        case 5:
            return '戊';
            break;
        case 6:
            return '己';
            break;
        case 7:
            return '庚';
            break;
        case 8:
            return '辛';
            break;
        case 9:
            return '壬';
            break;
        case 10:
            return '癸';
            break;
        default:
            console.log('error');
    }
}

function getEBChinese(num) {
    switch (num) {
        case 1:
            return '子';
            break;
        case 2:
            return '丑';
            break;
        case 3:
            return '寅';
            break;
        case 4:
            return '卯';
            break;
        case 5:
            return '辰';
            break;
        case 6:
            return '巳';
            break;
        case 7:
            return '午';
            break;
        case 8:
            return '未';
            break;
        case 9:
            return '申';
            break;
        case 10:
            return '酉';
            break;
        case 11:
            return '戌';
            break;
        case 12:
            return '亥';
            break;
        default:
            console.log('error');
    }
}

client.login(process.env.BOT_TOKEN);
