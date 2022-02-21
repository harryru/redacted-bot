import { memberCount } from "./main";

const commandHandler = (args, command) => {
    command.splice(0, 1);
    switch (command[0]){
        case "memberCount":
            memberCountCommand(args,command.splice(0,1));
            break;
        default:
            message.channel.send('Unkown command.');
    }
}



const memberCountCommand = (args) => {
    args.channel.send(`Member Count ${memberCount}`);
}



export default commandHandler;

