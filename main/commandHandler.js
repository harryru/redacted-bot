//const config = require("./config.json");
const methods = require("./commands.js");
//const inviteLink = config.INVITE_LINK;

const commandParser = (args,command) => {
    command.splice(0, 1);
    console.log(methods, command, typeof methods[command[0].toLowerCase()]);
    if ((typeof methods[command[0].toLowerCase()] === undefined)) {
        methods['unknownCommand'](args,command);
        return;
    } else {
        //methods[command[0].toLowerCase()](args,command);
        cmd = command.slice();
        cmd.splice(0, 1);
        methods[command[0].toLowerCase()](args,cmd);
    }
}

module.exports = {
    commandParser,
}