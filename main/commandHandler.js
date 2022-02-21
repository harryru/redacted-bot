


const commandParser = (args, command) => {
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
    const count = args.guild.memberCount;
    args.channel.send(`Member Count ${count}`);
}

module.exports = {
    commandParser,
}