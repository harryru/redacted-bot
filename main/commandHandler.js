const config = require("./config.json");

const inviteLink = config.INVITE_LINK;

//check for if command has extra values, if so reject for incorrect syntax.
//do this in a function invalidArguments()
//add case where if command is just "!r" then gives a list of commands or help embed
const commandParser = (args, command) => {
    command.splice(0, 1);
    switch (command[0]) {
        case "memberCount":
            memberCountCommand(args, command.splice(0, 1));
            //reactComplete
            break;
        case "invite":
            inviteCommand(args, );
            //reactComplete
            break;
        default:
            args.channel.send('Unkown command.');
    }
}

const reactComplete = (args) => {
    args.react(args.guild.emojis.cache.get("944559411530178631"));
}

const memberCountCommand = (args) => {
    const count = args.guild.memberCount;
    args.channel.send(`Member Count ${count}`);
    reactComplete(args);
}

const inviteCommand = (args) => {
    args.channel.send(`**Discord** - https://discord.gg/${inviteLink}`);
    reactComplete(args);
}

module.exports = {
    commandParser,
}