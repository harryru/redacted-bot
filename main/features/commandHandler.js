const methods = require("../commands.js");

const commandParser = (args,command) => {
    command.splice(0, 1);
    if ((typeof methods[command[0].toLowerCase()] === undefined)) {
        methods['unknownCommand'](args,command);
        return;
    } else {
        cmd = command.slice();
        cmd.splice(0, 1);
        methods[command[0].toLowerCase()](args,cmd);
    }
}

module.exports = {
    commandParser,
}