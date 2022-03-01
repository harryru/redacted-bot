import {commandParser} from './features/commandHandler.mjs'
import {updateMemberCount} from './features/updateMemberCount.mjs';
import {autoRole} from './features/autoRole.mjs';
import {singleDelete} from './commands.mjs';

import Discord from 'discord.js';
import {config} from "./config.mjs";

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
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
        var args = message.content.split(" ");
        if (args[0] === "!r") {
            commandParser(message, message.content.split(" "),client);
        }
    }
});

client.on('messageDelete', message => {
    if (!message.author.id === config.BOT_ID){
        singleDelete(message);
    }    
  });
  

client.login(config.BOT_TOKEN);