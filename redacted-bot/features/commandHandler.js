const { reactFail } = require("../commands.js");
const methods = require("../commands.js");
const config = require("../config.json");

const commandParser = (args,command) => {
    command.splice(0, 1);
    if (command.length === 0) {
        methods['commands'](args,command);
        return;
    }
    console.log(command,command[0].toLowerCase(),(methods[command[0].toLowerCase()] === undefined));
    console.log(typeof methods[command[0].toLowerCase()]);
    if (!(typeof methods[command[0].toLowerCase()] === undefined)) {
        cmd = command.slice();
        if (permissionCheck(args,command[0].toLowerCase())) {
            cmd.splice(0, 1);
            methods[command[0].toLowerCase()](args,cmd);
        }
        else {
            return;
        }
    }else {
        methods['unknownCommand'](args,command);
        return;
    }
}

const permissionCheck = (args,command) => {
    var validChannel = false;
    var validUser = false;
    PERMISSIONS[command]?.channels.map(channel => {
        if( args.member.permissions.has('ADMINISTRATOR')|| channel === 'ANY_CHANNEL' ||channel === args.channel.id || args.member.roles.cache.has(config.ADMIN_ROLE_ID)){
            validChannel = true;
        }
    })
    PERMISSIONS[command]?.user.map(userRole => {
        if ( args.member.permissions.has('ADMINISTRATOR') || userRole === 'EVERYONE' || args.member.roles.cache.has(userRole) || args.member.roles.cache.has(config.ADMIN_ROLE_ID)) {
            validUser = true;
        }
    })
    if (validChannel && validUser) {
        return true;
    }
    else if (validChannel && !validUser) {
        reactFail(args);
        return false;
    }
    return false;
}

const PERMISSIONS = {
    invite: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    commands:{
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    avatar:{
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    membercount:{
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    post:{
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    }
    
}

module.exports = {
    commandParser,
}