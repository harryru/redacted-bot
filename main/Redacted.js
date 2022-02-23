const {commandParser} = require('./features/commandHandler')
const {updateMemberCount} = require('./features/updateMemberCount');
const {autoRole} = require('./features/autoRole');

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
prefix as well, etc
const adminRole = config.ADMIN_ROLE_ID;
const autoRole = config.AUTO_ROLE_ID;
const memberCountChannel = config.MEMBER_COUNT_CHANNEL_ID;
*/

client.on('ready', () => {
    updateMemberCount(client);
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

/* If user joins server, check if we're looking at the right server, then auto grant "Friends" role. */
client.on('guildMemberAdd', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount(client);
        autoRole(member);
        return;
    }
});

client.on('guildMemberRemove', member => {
    if (client.guilds.cache.get(config.SERVER_ID)) {
        updateMemberCount(client);
        return;
    }
});

client.on('messageCreate', message => {
    if (!(message.author.id === config.BOT_ID) && message.content.startsWith(prefix) /* && message.channelId === '804810738979176450' */) {
        commandParser(message, message.content.split(" "));
    }
});

client.login(config.BOT_TOKEN);