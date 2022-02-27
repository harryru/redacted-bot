import {config} from "../patinoConfig.mjs";

export const updateMemberCount = (client) => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var count = guild.memberCount;
    var memberCountChannel = guild.channels.resolve(config.MEMBER_COUNT_CHANNEL_ID);
    memberCountChannel.edit({ name: `Member Count: ${count}` })
        .then(console.log(`Member Count Updated: ${count}`))
        .catch(console.error);
};

