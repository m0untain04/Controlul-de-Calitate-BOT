

bot.on('ready', async => {
    console.log("*  ===================================================  *")
    console.log("           Controlul de Calitate has started             ")
    console.log("*  ===================================================  *")
    console.log("   Username:  "+bot.user.tag)
    console.log("   Servers:    "+bot.guild.cache.size)
    bot.user.setActivity(settings.activity);
})
