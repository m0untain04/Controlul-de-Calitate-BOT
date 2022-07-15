const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
// --> Functions from github.com/ZerioDev/Music-bot bcs to lazy to make them from 0
bot.commands = new Collection();
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
(async() => {
    console.log("Loading events...")
    try
    {
        readdirSync('./src/events/').forEach(file => {
            const event = require(`../src/events/${file}`);
            console.log(`-> Loaded event ${file}`);
        })
        require('../src/events/ready.js')
    }
    catch(err)
    {
        console.log("Events failed to load ! BOT not starting.")
        console.log("Error: "+err)
    }
    await sleep(5000)
    console.log(`Loading commands...`);
    try
    {
    readdirSync('./src/commands/').forEach(file => {
        const command = require(`../src/commands/${file}`);
        console.log(`-> Loaded command ${command.name.toLowerCase()}`);
        bot.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../src/commands/${file}`)];
    });
    }
    catch(err)
    {
        console.log("Commands failed to load !")
        console.log("Error: "+err.stack)
    }

})();
let signalInProgress = false;
["SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT", "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
        if(signalInProgress) return;
        signalInProgress = true;
        bot.user.setStatus("invisible");
        process.exit();
    });
 });

