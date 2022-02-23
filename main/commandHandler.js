const config = require("./config.json");

const inviteLink = config.INVITE_LINK;

//check for if command has extra values, if so reject for incorrect syntax.
//do this in a function invalidArguments()
//add case where if command is just "!r" then gives a list of commands or help embed
const commandParser = (args, command) => {
    command.splice(0, 1);

    if (command.length === 0) {
        listCommands(args);
    }
    
    else {
        switch (command[0].toLowerCase()) {
            case "commands":
                listCommands(args, command.splice(0, 1));
                break;
            case "invite":
                inviteCommand(args, command.splice(0, 1));
                break;
            case "membercount":
                memberCountCommand(args, command.splice(0, 1));
                break;
            default:
                args.channel.send('Unkown command.');
        }
    }
}

const checkInvalidSyntax = (args, command, parameters) => {
    if (command.length > parameters) {

    }
}

const reactComplete = (args) => {
    args.react("✅");
}

const listCommands = (args, command) => {
    args.channel.send("!r <command> -- commands, invite, membercount");
    reactComplete(args);
}

const memberCountCommand = (args, command) => {
    checkInvalidSyntax(args, command, 0);
    const count = args.guild.memberCount;
    args.channel.send(`Member Count ${count}`);
    reactComplete(args);
}

const inviteCommand = (args, command) => {
    checkInvalidSyntax(args, command, 0);
    args.channel.send(`**Discord** - https://discord.gg/${inviteLink}`);
    reactComplete(args);
}

module.exports = {
    commandParser,
}