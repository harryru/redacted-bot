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
    var memberCountChannel = guild.channels.resolve("944578541893333022");
    memberCountChannel.edit({ name: `Member Count: ${memberCount}` })
        .then(console.log(`Member Count Updated: ${memberCount}`))
        .catch(console.error);
};

const prefix = '!r';

client.on('ready', () => {
    updateMemberCount();
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

/* If user joins server, check if we're looking at the right server, then auto grant "Friends" role. */
client.on('guildMemberAdd', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount();
        return member.roles.add(member.guild.roles.cache.get(config.ROLE_ID));
    }
});

client.on('guildMemberRemove', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount();
        return;
    }
});

client.on('message', message => {
    console.log("message creation noticed");
    if(!message.content.startsWith(prefix) && !message.channelId === '804810738979176450') return;

    console.log('Command Received');
    message.channel.send('Test');
});

client.login(config.BOT_TOKEN);

