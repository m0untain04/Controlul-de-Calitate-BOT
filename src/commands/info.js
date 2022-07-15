const { MessageEmbed } = require('discord.js')
const os = require('os')
require('../functions.js')
module.exports = {
    name: 'info',
    utilisation: '{PREFIX}info',

    async execute(bot, message) {
        var text1 = await message.channel.send("Checking syntax...")
        var date = new Date(null);
        var cpu = `${os.cpus().map(i => `${i.model}\n`)}`
        var cpu_speed = `${os.cpus().map(i => `${i.speed}`+"MHz\n")}`
        date.setSeconds(os.uptime()); // specify value for SECONDS here
        var result = date.toISOString().substr(11, 8);
        let avatar = bot.user.avatarURL({ dynamic : true ,size: 2048});
        let embed = new MessageEmbed();
        embed.setColor("b30000");
        embed.setTitle(`${bot.user.username} - INFO`)
        embed.setThumbnail(avatar);
        bot.users.fetch(settings.owner_id,false).then(dev => {
          embed.addField("Developed by:", dev.tag)
        embed.addField("Website:", "https://m0untain.agency\nhttps://pe-promenada.agency")
        embed.addField("Servers:", `${bot.guilds.cache.size}`)
        embed.addField("Users:", `${bot.users.cache.size}`)
        embed.addField("OS platform:", os.platform())
        embed.addField("OS release:", os.release())
        embed.addField("CPU:", `${cpu}`)
        embed.addField("CPU speed:", `${cpu_speed}`)
        embed.addField("Used RAM:", `${bytesToSize(os.freemem())}`)
        embed.addField("Total RAM:", `${bytesToSize(os.totalmem())}`)
        embed.addField("Uptime:", result )
        text1.edit({content: ' ', embeds: [embed]});;
    })
    }
}