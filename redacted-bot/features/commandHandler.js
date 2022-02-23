const methods = require("../commands.js");
const config = require("./config.json");

const commandParser = (args,command) => {
    command.splice(0, 1);
    if (command.length === 0) {
        methods['commands'](args,command);
        return;
    }
    if ((typeof methods[command[0].toLowerCase()] === undefined)) {
        methods['unknownCommand'](args,command);
        return;
    } else {
        cmd = command.slice();
        if(permissionCheck(command[0].toLowerCase())){
            cmd.splice(0, 1);
            methods[command[0].toLowerCase()](args,cmd);
        }else{
            return;
        }
    }
}


const permissionCheck = (args,command) => {
    var validChannel = false;
    //var validUser = false;
    PERMISSIONS[command].channels.map(channel => {
        if(channel === args.channel.id){
            validChannel = true;
        }
    })
    console.log(args.member.roles.cache);
    if(validChannel){
        return true;
    }
    return false;
}


const PERMISSIONS = {
    invite: {
        channels: [config.BOT_CHANNEL_ID],
        user: [config.ADMIN_ROLE_ID]
    }
}

module.exports = {
    commandParser,
}