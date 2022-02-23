const config = require("../config.json");

const autoRole = (member) => {
    member.roles.add(member.guild.roles.cache.get(config.AUTO_ROLE_ID));
    return;
}

module.exports = {
    autoRole,
}