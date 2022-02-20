const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

const updateMemberCount = () => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var memberCount = guild.memberCount;
    var memberCountChannel = client.channels.fetch("944578541893333022");
    console.log(memberCountChannel);
    memberCountChannel.setName(`Member Count: ${memberCount}`);

   // console.log(`Member Count Updated: ${memberCount}`);
};


client.on('ready', () => {
    updateMemberCount();
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

/* If user joins server, check if we're looking at the right server, then auto grant "Friends" role. */
client.on('guildMemberAdd', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        return member.roles.add(member.guild.roles.cache.get(config.ROLE_ID));
    }
});

client.login(config.BOT_TOKEN);

