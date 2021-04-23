/*
======================================================================================
                    Controlul de calitate BOT by m0untain#1337
                                   1.5
======================================================================================
*/
const Discord = require('discord.js')
const bot = new Discord.Client();
const token = 'tokenu' //- Token
const os = require("os"); 
const PREFIX = `controlule, `;
const snekfetch = require('snekfetch');

var developer = "309333602129281027"
bot.on('ready', () =>
{
    var lastrestart = GenerateDate();
    console.log(`Controlul de calitate a inceput.\
                \nTotal servers counted: ${bot.guilds.cache.size}\
                \nTotal users counted: ${bot.users.cache.size}\
                \n\nDeveloped by: m0untain#1337\n\nOriginal creator: phnzr#3280`)
    bot.user.setActivity(`last restart: ${lastrestart}`, { type: 'STREAMING', url: `https://www.youtube.com/watch?v=9dOEUErDOG8&feature=youtu.be`});

})

bot.on('guildDelete', guild => {bot.users.fetch(developer,false).then(user => {user.send(`Controlul removed from ${guild.name} on ${new Date()} owned by ${guild.owner.displayName}`);}) 
})
bot.on(`guildCreate`, guild => {bot.users.fetch(developer,false).then(user => {user.send(`Controlul added in ${guild.name} on ${new Date()} owned by ${guild.owner.displayName}`);}) 
})
function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }
function bytesToSize(bytes) 
{
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function GenerateDate()
{
  var ziua = new Date().getDate();
    if(ziua < 10)
    {
      var strziua = "0"+ziua;
    }
    else
    {
      var strziua = ziua;
    }
    var luna = new Date().getMonth() + 1;
    if(luna < 10)
    {
      var strluna = "0"+luna;
    }
    else
    {
      var strluna = luna;
    }
    var an = new Date().getFullYear();
    var ora = new Date().getHours();
    if(ora < 10)
    {
      var strora = "0"+ora;
    }
    else
    {
      var strora = ora;
    }
    var minut = new Date().getMinutes();
    if(minut < 10)
    {
      var strminut = "0"+minut;
    }
    else
    {
      var strminut = minut;
    }
    var secunda = new Date().getSeconds();
    if(secunda < 10)
    {
      var strsecunda = "0"+secunda;
    }
    else
    {
      var strsecunda = secunda;
    }
    return `${strziua}/${strluna}/${an} ${strora}:${strminut}:${strsecunda}`
}
//Commands :D
bot.on('message', async message => 
{
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let args = message.content.substring(PREFIX.length).split(" ")

    if(message.content.startsWith(`${PREFIX}ping`))
    {
        var ping = require('ping');
        if(!args[1])
        {
            var editare = await message.channel.send("Checking syntax...")
            let embed = new Discord.MessageEmbed;
            var ping = editare.createdTimestamp - message.createdTimestamp;
            var botPing = Math.round(bot.pi);
            embed.setTitle("Ping")
            embed.setColor("ff0000")
            embed.addField("Latency:", `${ping} ms.`)
            editare.edit('',embed)
        }
        else
        {
            var ipul = args[1];
            ipul.replace(";"," ")   
            var text1 = await message.channel.send(`Pinging ${ipul}...`)
            var iponline;
            var res = await ping.promise.probe(ipul, {
                timeout: 10,
                extra: ['-i', '2'],
            })
            if(res.host == undefined) return await text1.edit("Cannot get IP.")
            var iponline;
            ping.sys.probe(ipul, function(isAlive){
                iponline = isAlive ? 'online' : 'offline';
            let embed = new Discord.MessageEmbed;
            embed.setColor("ff0000")
            embed.setTitle(`Ping ${ipul} status`)
            embed.addField(`IP:`, `${ipul}`)
            embed.addField(`Status:`, iponline)
            embed.addField(`Latency:`, res.time)
            embed.addField(`Output:`, res.output)
         return text1.edit('',embed)
        })
        }
    }
    if (message.content.startsWith(`${PREFIX}lookup`)) {
        if(!args[1]) return message.channel.send("Syntax: controlule, lookup <ip>");
        message.channel.send("Checking syntax...").then((msg) => {
        snekfetch.get(`http://ip-api.com/json/${args[1]}`).then(r => {
          let ipinfo = new Discord.MessageEmbed()
          if(r.body.status == "fail") return msg.edit(`Cannot get IP.`);
          ipinfo.setColor("ff0000");
            ipinfo.setTitle(`IP Lookup ${args[1]}:`)
            ipinfo.addField(name=`Target:`, value=`${args[1]}`, ipinfo); 
            ipinfo.addField(name=`ASN:`, value=`${r.body.as}`, ipinfo); 
            ipinfo.addField(name=`ISP:`, value=`${r.body.isp}`, ipinfo); 
            ipinfo.addField(name=`City:`, value=`${r.body.city}`, ipinfo); 
            ipinfo.addField(name=`Region:`, value=`${r.body.regionName}(${r.body.region})`, ipinfo); 
            ipinfo.addField(name=`Country:`, value=`${r.body.country}(${r.body.countryCode})`, ipinfo); 
            ipinfo.addField(name=`Timezone:`, value=`${r.body.timezone}`, ipinfo); 
            msg.edit('',ipinfo);
        });
      })
    }
    if(message.content.startsWith(`${PREFIX}userinfo`)) {
        if(!args[1]) return message.channel.send("Syntax: controlule, userinfo <user id>")
        var user = message.mentions.users.first() || await bot.users.fetch(args[1]);
        var member = await message.guild.member(user);
        let avatar = user.avatarURL({ dynamic : true ,size: 2048}); 
        const time = user.createdAt;
        const newTime = time.toLocaleTimeString();
        const embed = new Discord.MessageEmbed()
        embed.setColor("ff0000");
        embed.setThumbnail(avatar)
        embed.setTitle(`${user.tag} - user info:`)
        embed.addField("ID:", `${user.id}`, embed)
        embed.addField("Status:", `${user.presence.status}`, embed)
        embed.addField("Playing:", `${user.presence.activities[0] ? user.presence.activities[0].name : "null"}`, embed)
        embed.addField("Created on:", new Date(user.createdAt), embed) 
        if(!message.guild.member(user)) {
        embed.addField("Member:", `no`, embed)
        return message.channel.send(embed);
        }
        else
        embed.addField("Member:", `yes`, embed)
        embed.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'null'}`, embed)
        embed.addField("Joined at:", new Date(member.joinedAt), embed)
        message.channel.send(embed);
    }  
    if(message.content.startsWith(`${PREFIX}serverinfo`)) {
        var currentguild;
        currentguild = bot.guilds.cache.get(message.guild.id);
          var membersCount = currentguild.members.cache.filter(member => !member.user.bot).size;
          var botCount = currentguild.members.cache.filter(member => member.user.bot).size;
          var channelsCount = currentguild.channels.cache.size;
          var channelstextCount = currentguild.channels.cache.filter(c => c.type === 'text').size;
          var channelsvoiceCount = currentguild.channels.cache.filter(c => c.type === 'voice').size;
          var countonline = 0, countoffline = 0;
          currentguild.members.cache.forEach(m => {
            if(m.presence.status == "online" || m.presence.status == "dnd" || m.presence.status == "idle") { countonline++; }
            else { countoffline++; }
          });
          
          var serverid;
          const time = currentguild.createdAt;
          const newTime = time.toLocaleTimeString();
          const embed = new Discord.MessageEmbed()
            .setTitle(`${currentguild.name} - SERVER INFO:`)
            .setThumbnail(currentguild.iconURL({dynamic : true, size : 2048}))
            .setColor('#0xff0000')
            .addFields 
            (
              { name: "ID:", value: `${currentguild.id}` },
              { name: "Region:", value: currentguild.region },
              { name: "Owner:", value: `${currentguild.owner.user.tag}`, inline: true },
              { name: "Members:", value: `${countonline}/${currentguild.memberCount} (Bots: ${botCount})`},
              { name: `Text Channels:`, value: `${channelstextCount}`},
              { name: `Voice Channels:`, value: `${channelsvoiceCount}`},
              //{ name: `Roles:`, value: `${currentguild.roles.cache.map(roles => `${roles}`).join(',')}`},
              { name: "Created on:", value: new Date(currentguild.createdAt) },
            )
          message.channel.send(embed);
      } 
    if(message.content.startsWith(`${PREFIX}skemaionel`))
    {
        var text1 = await message.channel.send("Checking permissions...")
        if(message.author.id != message.guild.owner.user.id) return text1.edit("N-ai acces sarakule !")
        text1.edit("skemaionel engaged...")
        message.guild.members.cache.forEach(member => message.channel.send(`/ban ${member.user.username} 0 controlul de calitate`)); 
        message.channel.send("Controlul a fost finalizat.")
    } 
      if(message.content.startsWith(`${PREFIX}info`))
      {
          var text1 = await message.channel.send("Checking syntax...")
          var date = new Date(null);
          date.setSeconds(os.uptime()); // specify value for SECONDS here
          var result = date.toISOString().substr(11, 8);
          let embed = new Discord.MessageEmbed;
          embed.setColor("ff0000");
          embed.setTitle("Controlul de calitate - INFO:")
          embed.setThumbnail("https://cdn.discordapp.com/avatars/735185611643682826/1be4faed66c3091bb9eef4df91556cb9.webp?size=2048");
          embed.addField("Developed by:", "m0untain#1337")
          embed.addField("Website:", "https://discord.gg/Tbd6PsWbrt")
          embed.addField("Invite Link:", "Invite link not avaliable for now !")
          embed.addField("Servers:", bot.guilds.cache.size)
          embed.addField("Users:", bot.users.cache.size)
          embed.addField("OS platform:", os.platform())
          embed.addField("OS release:", os.release())
          embed.addField("CPU:", os.cpus().map(i => `${i.model}`))
          embed.addField("CPU speed:", os.cpus().map(i => `${i.speed}MHz`))
          embed.addField("Used RAM:", `${bytesToSize(os.freemem())}`)
          embed.addField("Total RAM:", `${bytesToSize(os.totalmem())}`)
          embed.addField("Uptime:", result)
          text1.edit('',embed);
      }
})

bot.login(token)
