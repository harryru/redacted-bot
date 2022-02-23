const {commandParser} = require('./features/commandHandler')
const {updateMemberCount} = require('./features/updateMemberCount');
const {autoRole} = require('./features/autoRole');

const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.BANS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS
    ]
});

client.on('ready', () => {
    updateMemberCount(client);
    console.log(`Launched as a bot: ${client.user.tag}!`);
});

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
    if (!(message.author.id === config.BOT_ID) && message.content.startsWith(config.PREFIX)) {
        commandParser(message, message.content.split(" "));
    }
});

client.login(config.BOT_TOKEN);