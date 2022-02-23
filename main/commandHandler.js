const config = require("./config.json");

const inviteLink = config.INVITE_LINK;

//check for if command has extra values, if so reject for incorrect syntax.
//do this in a function invalidArguments()
//add case where if command is just "!r" then gives a list of commands or help embed
const commandParser = (args, command) => {
    command.splice(0, 1);

    if (command.length === 0) {
        listCommands(args, command);
    }
    
    else {
        switch (command[0].toLowerCase()) {
            case "commands":
                command.splice(0, 1);
                listCommands(args, command);
                break;
            case "invite":
                command.splice(0, 1)
                inviteCommand(args, command);
                break;
            case "membercount":
                command.splice(0, 1)
                memberCountCommand(args, command);
                break;
            default:
                reactFail(args);
                args.channel.send('Unkown command.');
        }
    }
}

const checkValidSyntax = (args, command, parameters) => {
    if (command.length > parameters) {
        args.channel.send("Invalid syntax.");
        reactFail(args);
        return false;
    }
    return true;
}

const reactComplete = (args) => {
    args.react("✅");
}

const reactFail = (args) => {
    args.react("❌");
}

const listCommands = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        args.channel.send("!r <command> -- commands, invite, membercount");
        reactComplete(args);
    }
}

const memberCountCommand = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        const count = args.guild.memberCount;
        args.channel.send(`Member Count ${count}`);
        reactComplete(args);
    }
}

const inviteCommand = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        args.channel.send(`**Discord** - https://discord.gg/${inviteLink}`);
        reactComplete(args);
    }
}

module.exports = {
    commandParser,
}