/*
    * ========================================================== * 
               Controlul de Calitate - Discord BOT 2.0
            
            by m0untain                 v2.0(Discord V13)
    * ========================================================== *
*/

const { Client, Intents } = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]})
global.bot = bot;
require('./variables.js')
require('./events/loader.js')
if(settings.bot_token.length == 0) return console.log("ERROR: You did not enter a token.")
else if(settings.owner_id.length == 0) return console.log("ERROR: You did not enter a owner id.")
else if(settings.activity.length == 0) return console.log("ERROR: You did not enter a activity.")
else if(settings.prefix.length == 0) return console.log("ERROR: You did not enter a prefix.")
bot.login(settings.bot_token)
/*
    * ========================================================== * 
               Controlul de Calitate - Discord BOT 2.0
                          End of index.js
            by m0untain                 v2.0(Discord V13)
    * ========================================================== *
*/