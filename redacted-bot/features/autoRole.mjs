/*
 * If user joins server, check if we're looking at the right server, then auto grant "Friends" role.
*/

import {config} from "../config.mjs";

export const autoRole = (member) => {
    member.roles.add(member.guild.roles.cache.get(config.AUTO_ROLE_ID));
    return;
}

