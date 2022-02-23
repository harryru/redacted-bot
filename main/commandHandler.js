const config = require("./config.json");
const methods = require("./commands.js");

const inviteLink = config.INVITE_LINK;


/// ProtoType of more robust commandParser...
const commandParserProto = (args,command) => {
    if(!(typeof methods[command[0].toLowerCase()] === undefined)){
        return;
    }else{
        command.splice(0, 1);
        methods[command[0].toLowerCase()](args,command);
    }
}

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
            case "avatar":
                command.splice(0, 1)
                avatarCommand(args, command);
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
        args.channel.send("!r <command> -- commands, invite, membercount, avatar");
        reactComplete(args);
    }
}

const inviteCommand = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        args.channel.send(`**Discord** - https://discord.gg/${inviteLink}`);
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

const avatarCommand = (args, command) => {
    if (checkValidSyntax(args, command, 1)) {
        if (command.length === 0) {
            //embed this whole pic
            args.channel.send(args.author.avatarURL());
        }
        else {
            //solve for avatar of given tag
        }
        reactComplete(args);
    }
}

module.exports = {
    commandParser,
}