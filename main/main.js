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

const updateMemberCount = () => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var memberCount = guild.memberCount;
    var memberCountChannel = guild.channels.resolve("944578541893333022");
    memberCountChannel.edit({ name: `Member Count: ${memberCount}` })
        .then(console.log(`Member Count Updated: ${memberCount}`))
        .catch(console.error);
};

const commandHandler = (command) => {
    console.log('command: ', command)
}


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

client.on('messageCreate', message => {
    if(message.content.startsWith(prefix) && message.channelId === '804810738979176450') {
        console.log('Command Received');
        message.channel.send('Test');

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        commandHandler(command);

    }
});

client.login(config.BOT_TOKEN);

