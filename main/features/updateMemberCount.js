const updateMemberCount = (client) => {
    const guild = client.guilds.cache.get(config.SERVER_ID);
    var count = guild.memberCount;
    var memberCountChannel = guild.channels.resolve("944578541893333022");
    memberCountChannel.edit({ name: `Member Count: ${count}` })
        .then(console.log(`Member Count Updated: ${count}`))
        .catch(console.error);
};



module.exports = {
    updateMemberCount,
}