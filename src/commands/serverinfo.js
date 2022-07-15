const { MessageEmbed, Guild } = require('discord.js')
module.exports = {
    name: 'serverinfo',
    utilisation: '{PREFIX}serverinfo',

    async execute(bot, message, args) {
        const owner = await message.guild.fetchOwner();
        let embed = new MessageEmbed()
        .setTitle(`${message.guild.name} - SERVER INFO:`)
        .setThumbnail(message.guild.iconURL({dynamic : true, size : 2048}))
        .setColor('b30000')
        .addField("ID", message.guild.id)
        .addField("Owner", owner.user.tag)
        .addField("Members", `${message.guild.members.cache.filter(member => !member.user.bot).size} (Bots: ${message.guild.members.cache.filter(member => member.user.bot).size})`)
        .addField("Text Channels", `${message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size}`)
        .addField("Voice Channels", `${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`)
        .addField("Created on", `${new Date(message.guild.createdAt)}`)
        message.channel.send({embeds: [embed]});
    }
}