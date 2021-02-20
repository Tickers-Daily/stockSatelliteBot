const Discord = require("discord.js");
const bot = new Discord.Client();

const yf = require('yahoo-finance-webscraper');

bot.on("ready", () => {
    setInterval(() => {
        var guild = bot.guilds.cache.get(`guildID`); //Enter the guild id you would like to update
        var ticker = 'AAPL' //Display ticker
        yf.getSingleStockInfo(ticker).then(map => {
            if (map.regularMarketPrice == undefined) throw 'invalid symbol';
            var mapKeys = Object.keys(map);
            var price = (mapKeys.includes("preMarketPrice")) ? (map.preMarketPrice).toLocaleString() : (map.regularMarketPrice).toLocaleString()
            var price = (mapKeys.includes("postMarketPrice")) ? (map.postMarketPrice).toLocaleString() : (map.regularMarketPrice).toLocaleString()
            if (guild.me.nickname == `${price}`) return;
            guild.me.setNickname(`${price}`);
            bot.user.setActivity(`${(map.regularMarketChangePercent).toFixed(2)}% | ${map.symbol}`, {
                type: "WATCHING"
            });
        }).catch(err => {
            console.log(err)
        });
    }, 5000); //Changing this will change how fast the ticker updates. The minimum recommended value is 5000
});

console.log("Starting...")
bot.login('token').then(() => console.log(`Bot successfully initialized`));