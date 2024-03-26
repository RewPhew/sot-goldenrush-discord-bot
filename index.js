require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const moment = require('moment');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('messageCreate', async (message) => {
    function calculateGoldRushTime(){
        moment.updateLocale("en", {
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "about a minute",
                mm: "%d minutes",
                h: "about an hour",
                hh: "about %d hours",
                d: "about a day",
                dd: "%d days",
                w: "about a week",
                ww: "%d weeks",
                M: "about a month",
                MM: "%d months",
                y: "about a year",
                yy: "%d years"
            }
        });
        moment.relativeTimeThreshold("s", 55);
        moment.relativeTimeThreshold("ss", 3);
        moment.relativeTimeThreshold("m", 55);
        moment.relativeTimeThreshold("h", 23);

        function calculateGoldRush() {
            var goldRush1Start = moment.utc().set({
                hour: 1,
                minute: 0,
                second: 0
            });
            var goldRush1End = moment.utc().set({
                hour: 1,
                minute: 59,
                second: 59
            });
            var goldRush2Start = moment.utc().set({
                hour: 17,
                minute: 0,
                second: 0
            });
            var goldRush2End = moment.utc().set({
                hour: 17,
                minute: 59,
                second: 59
            });
            var now = moment.utc();
            if (now > goldRush2End) {
                now.subtract(1, "day");
            }
            if (now < goldRush1Start) {
                message.reply(`Gold rush in: ${now.to(goldRush1Start)}`)
            } else if (now > goldRush1Start && now < goldRush1End) {
                message.reply(`Sell that Plunder!`)
            } else if (now > goldRush1End && now < goldRush2Start) {
                message.reply(`Gold rush in: ${now.to(goldRush2Start)}`)
            } else if (now > goldRush2Start && now < goldRush2End) {
                message.reply(`Sell that Plunder!`)
            }
        }
        calculateGoldRush();
    }
    if (message.content === '!when?') {
        calculateGoldRushTime();
    }
});


client.login(process.env.TOKEN);


