module.exports = {
    name: 'skemaionel',
    utilisation: '{PREFIX}skemaionel',

    async execute(bot, message, args) {
        const owner = await message.guild.fetchOwner();
        var text1 = await message.channel.send("Checking permissions...")
        if(message.author.id != owner.user.id) return text1.edit("N-ai acces sarakule !")
        text1.edit("skemaionel engaged...")
        message.guild.members.cache.forEach(member => message.channel.send(`/ban ${member.user.username} 0 controlul de calitate`))
        message.channel.send("Controlul a fost finalizat.")
        
    }

}
