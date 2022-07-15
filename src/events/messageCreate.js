// --> Functions from github.com/ZerioDev/Music-bot bcs to lazy to make them from 0
bot.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    const PREFIX = settings.prefix
    let args = message.content.substring(PREFIX.length).split(" ")
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (cmd) cmd.execute(bot, message, args);
})