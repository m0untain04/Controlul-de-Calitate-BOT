const { MessageEmbed } = require('discord.js')
const snekfetch = require('snekfetch')
module.exports = {
    name: 'lookup',
    utilisation: '{PREFIX}lookup',

    async execute(bot, message, args) {
        message.channel.send("Checking syntax...").then((msg) => {
        if(!args[0]) return msg.edit("Syntax: controlule, lookup <ip>");
        msg.edit(`Looking up ${args[0]}...`).then(message2 => {
            snekfetch.get(`http://ip-api.com/json/${args[0]}`).then(r => {
            let ipinfo = new MessageEmbed()
            if(r.body.status == "fail") return msg.edit(`Cannot get IP.`);
            ipinfo.setColor("b30000");
                ipinfo.setTitle(`IP Lookup ${args[0]}:`)
                ipinfo.addField(name=`Target:`, value=`${args[0]}`, ipinfo); 
                ipinfo.addField(name=`ASN:`, value=`${r.body.as}`, ipinfo); 
                ipinfo.addField(name=`ISP:`, value=`${r.body.isp}`, ipinfo); 
                ipinfo.addField(name=`City:`, value=`${r.body.city}`, ipinfo); 
                ipinfo.addField(name=`Region:`, value=`${r.body.regionName}(${r.body.region})`, ipinfo); 
                ipinfo.addField(name=`Country:`, value=`${r.body.country}(${r.body.countryCode})`, ipinfo); 
                ipinfo.addField(name=`Timezone:`, value=`${r.body.timezone}`, ipinfo); 
                message2.edit({content: ' ', embeds: [ipinfo]});
            })
        });
      })
    }
}