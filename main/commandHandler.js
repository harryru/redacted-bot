const redacted = require("./Redacted.js");

export const commandParser = (args, command) => {
    command.splice(0, 1);
    switch (command[0]) {
        case "memberCount":
            memberCountCommand(args, command.splice(0, 1));
            break;
        default:
            args.channel.send('Unkown command.');
    }
}

const memberCountCommand = (args) => {
    args.channel.send(`Member Count ${redacted.getMemberCount()}`);
}
