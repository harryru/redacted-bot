import { reactFail } from "../commands.mjs";
import methods from "../commands.mjs";
import musicMethods from "../musicCommands.mjs";
import {config} from "../config.mjs";

export const commandParser = (args,command,client) => {

    args.channel.sendTyping();
    command.splice(0, 1);

    if (command.length === 0) {
        methods['commands'](args,command);
        return;

    }

    if ((typeof methods[command[0].toLowerCase()]) === 'undefined' && (typeof musicMethods[command[0].toLowerCase()]) === 'undefined') {
        methods['unknownCommand'](args,command);
    }
    else if((typeof musicMethods[command[0].toLowerCase()]) !== 'undefined'){
        let cmd = command.slice();
        if (permissionCheck(args,command[0].toLowerCase())) {
            cmd.splice(0, 1);
            musicMethods[command[0].toLowerCase()](args,cmd,client);
        }
    }
    else {
        let cmd = command.slice();
        if (permissionCheck(args,command[0].toLowerCase())) {
            cmd.splice(0, 1);
            methods[command[0].toLowerCase()](args,cmd,client);
        }

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
    commands: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    invite: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    usercount: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    roleinfo: {
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    },
    post: {
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    },
    purge: {
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    },
    image: {
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    },
    avatar: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    play: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    playing: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    pause: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    resume: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    previous: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    clear: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    loop: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    queue: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    shuffle: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    },
    skip: {
        channels: [config.BOT_CHANNEL_ID],
        user: ['EVERYONE', config.ADMIN_ROLE_ID]
    }
}