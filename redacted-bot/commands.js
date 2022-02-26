/* 
 * File Containing Command Functions....
*/
const config = require("./config.json");
const {constructEmbed} = require("./features/MessageEmbeds");

const listCommands = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        args.channel.send("!r <command> -- commands, invite, membercount, avatar");
        reactComplete(args);
    }
}

const inviteCommand = (args, command) => {
    if (checkValidSyntax(args, command, 0)) {
        args.channel.send(`**Discord** - https://discord.gg/${config.INVITE_LINK}`);
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

const postCommand = (args,command) => {
    if (checkValidSyntax(args, command, 'Unlimited')) {
            constructEmbed(args);
            reactComplete(args);
        
    };
}

const checkValidSyntax = (args, command, parameters) => {
    if(parameters === 'Unlimited'){
        return true;
    }
    else if (command.length > parameters) {
        args.channel.send("Invalid syntax.");
        reactFail(args);
        return false;
    }
    return true;
}

const unknownCommand = (args,command) =>{
    reactFail(args);
    args.channel.send('Unkown command.');
}

const reactComplete = (args) => {
    args.react("✅");
}

const reactFail = (args) => {
    args.react("❌");
}

module.exports={
    commands: listCommands,
    invite: inviteCommand,
    membercount: memberCountCommand,
    avatar: avatarCommand,
    post: postCommand,
    unknownCommand: unknownCommand,
    reactFail: reactFail
}