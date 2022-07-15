const ms = require('ms');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ping',
    utilisation: '{PREFIX}ping',

    async execute(bot, message, args) {
        var ping = require('ping');
        if(!args[0])
        {
            var editare = await message.channel.send("Checking syntax...")
            var ping = editare.createdTimestamp - message.createdTimestamp;
            var botPing = Math.round(bot.pi);
            const embed = new MessageEmbed()
            .setTitle("Ping")
            .setColor("b30000")
            .addField("Latency:", `${ping} ms.`)
            editare.edit({content: ' ', embeds: [embed]});
        }
        else
        {
            var ipul = args[0];
            ipul.replace(";"," ")   
            var text1 = await message.channel.send(`Pinging ${ipul}...`)
            var iponline;
            var res = await ping.promise.probe(ipul, {
                timeout: 2,
                deadline: 10,
                extra: ['-i', '2'],
            })
            if(res.host == "unknown") return await text1.edit("Cannot get IP.")
            var iponline;
            ping.sys.probe(ipul, function(isAlive){
                iponline = isAlive ? 'online' : 'offline';
            const embed = new MessageEmbed()
            embed.setColor("b30000")
            embed.setTitle(`Ping ${ipul} status`)
            embed.addField(`IP:`, `${ipul}`)
            embed.addField(`Status:`, iponline)
            if(res.time != "unknown") {embed.addField(`Latency:`, `${res.time}`)}
            embed.addField(`Output:`, res.output)
         return text1.edit({content: ' ', embeds: [embed]});
        })
        }
    },
};