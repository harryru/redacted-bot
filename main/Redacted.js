//Move autorole and update member count into seperatefile.

const {commandParser} = require('./commandHandler')

const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

const prefix = '!r';
/*
const adminRole = config.ADMIN_ROLE_ID;
const autoRole = config.AUTO_ROLE_ID;
const memberCountChannel = config.MEMBER_COUNT_CHANNEL_ID;
*/

const getMemberCount = () => {
    return memberCount;
}

const updateMemberCount = () => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var count = guild.memberCount;
    var memberCountChannel = guild.channels.resolve("944578541893333022");
    memberCountChannel.edit({ name: `Member Count: ${count}` })
        .then(console.log(`Member Count Updated: ${count}`))
        .catch(console.error);
};

client.on('ready', () => {
    updateMemberCount();
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

/* If user joins server, check if we're looking at the right server, then auto grant "Friends" role. */
client.on('guildMemberAdd', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount();
        return member.roles.add(member.guild.roles.cache.get(config.AUTO_ROLE_ID));
    }
});

client.on('guildMemberRemove', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount();
        return;
    }
});

client.on('messageCreate', message => {
    if (!(message.author.id === "944508079532294144") && message.content.startsWith(prefix) /* && message.channelId === '804810738979176450' */) {
        commandParserProto(message, message.content.split(" "));
    }
});

client.login(config.BOT_TOKEN);


module.exports = {
    getMemberCount,
}