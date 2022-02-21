//import {commandParser} from "./commandHandler.mjs";

const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = '!r';
var memberCount;

const getMemberCount = () => {
    return memberCount;
}

const updateMemberCount = () => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var count = guild.memberCount;
    var memberCountChannel = guild.channels.resolve("944578541893333022");
    memberCount = count;
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
        return member.roles.add(member.guild.roles.cache.get(config.ROLE_ID));
    }
});

client.on('guildMemberRemove', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount();
        return;
    }
});
/*
client.on('messageCreate', message => {
    if(message.content.startsWith(prefix) && message.channelId === '804810738979176450') {
        commandParser(message, message.content.split(" "));
    }
});
*/
client.login(config.BOT_TOKEN);