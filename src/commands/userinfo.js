const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'userinfo',
    utilisation: '{PREFIX}userinfo',

    async execute(bot, message, args) {
        var text1 = await message.channel.send("Checking syntax...")
        if(!args[0]) return text1.edit("Syntax: controlule, userinfo <user id/mention>")
        var user = message.mentions.users.first() || await bot.users.fetch(args[0]);
        var member = message.guild.members.cache.get(user.id);
        if(!member) await message.guild.members.fetch(user.id).catch(() => {}) || false;
        let avatar = user.avatarURL({ dynamic : true ,size: 2048}); 
        const time = user.createdAt;
        const newTime = time.toLocaleTimeString();
        const embed = new MessageEmbed()
        embed.setColor("b30000");
        embed.setThumbnail(avatar)
        embed.setTitle(`${user.tag} - user info:`)
        embed.addField("ID:", `${user.id}`, embed)
        embed.addField("Status:", `${member.presence.status}`, embed)
        embed.addField("Playing:", `${member.presence.activities[0] ? member.presence.activities[0].name : "null"}`, embed)
        embed.addField("Created on:", `${new Date(user.createdAt)}`, embed) 
        embed.addField("Joined at:", `${new Date(member.joinedAt)}`, embed)
        text1.edit({content: ' ', embeds: [embed]});
    }
}