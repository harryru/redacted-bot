import {config} from "../config.mjs";

export const updateUserCount = (client) => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var count = guild.memberCount;
    var userCountChannel = guild.channels.resolve(config.USER_COUNT_CHANNEL_ID);
    userCountChannel.edit({ name: `User Count: ${count}` })
        .then(console.log(`User Count Updated: ${count}`))
        .catch(console.error);
};

