const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS
] });

client.on('ready', () => {
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

/* If user joins server, check if we're looking at the right server, then auto grant "Friends" role. */
client.on('guildMemberAdd', member => {
    if(client.guilds.cache.get(config.SERVER_ID)) {
        return member.roles.add(member.guild.roles.cache.get(config.ROLE_ID));
    }
});

client.login(config.BOT_TOKEN);
