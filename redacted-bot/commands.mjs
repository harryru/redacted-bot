/* 
 * File Containing Command Functions....
*/
import { config } from "./config.mjs";
import { constructEmbed, roleInfoEmbed, purgeEmbed, deleteEmbed, buildDescription } from "./features/MessageEmbeds.mjs";
import { imgSearch } from "./features/imageSearch.mjs";

const listCommands = (args, command) => {

    if (checkValidSyntax(args, command, 0)) {
        args.channel.send("!r <command> -- commands, invite, usercount, roleinfo, post <content>, purge <#>, image, avatar");
        reactComplete(args);
    }

}

const inviteCommand = (args, command) => {

    if (checkValidSyntax(args, command, 0)) {
        args.channel.send(`**Discord** - https://discord.gg/${config.INVITE_LINK}`);
        reactComplete(args);
    }

}

const userCountCommand = (args, command) => {

    if (checkValidSyntax(args, command, 0)) {
        const count = args.guild.memberCount;
        args.channel.send(`User Count ${count}`);
        reactComplete(args);
    }

}

const roleInfoCommand = (args, command) => {

    args.guild.members.fetch()

    if (checkValidSyntax(args, command, 0)) {
        roleInfoEmbed(args);
        reactComplete(args);
    }

}

const postCommand = (args, command) => {

    if (checkValidSyntax(args, command, 'Unlimited')) {
        constructEmbed(args);
        reactComplete(args);
    };

}

async function purgeCommand(args, command) {

    if (checkValidSyntax(args, command, 1)) {
        if(command[0] > 100){
            args.channel.send("Attempt to purge failed. Maximum allowed: 100.");
            return;
        }

        let messages = await args.channel.messages.fetch({ limit: 1 })
        let response = buildDescription(messages);
        let deleteMessage = deleteEmbed(args, response.description);
        await args.channel.bulkDelete(parseInt(1));
        messages = await args.channel.messages.fetch({ limit: parseInt(command[0]) });
        response = buildDescription(messages);
        let purge = purgeEmbed(args, response.number, response.description);
        args.channel.bulkDelete(parseInt(command[0]));
        const guild = args.guild;
        guild.channels.fetch(config.ACTIVITY_CHANNEL_ID)
            .then(channel => { channel.send({ embeds: [deleteMessage, purge] }) })
            .catch(console.error);
    }

}

const imageCommand = (args, command) => {

    if (checkValidSyntax(args, command, 1)) {
        imgSearch(args, command[0]);
        reactComplete(args);
    };

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

const unknownCommand = (args) => {

    reactFail(args);
    args.channel.send('Unkown command.');

}

const reactComplete = (args) => {

    args.react("✅");

}

export const reactFail = (args) => {

    args.react("❌");

}

const checkValidSyntax = (args, command, parameters) => {

    if (parameters === 'Unlimited') {
        return true;
    }

    else if (command.length > parameters) {
        args.channel.send("Invalid syntax.");
        reactFail(args);
        return false;
    }

    return true;

}

export async function singleDelete(message) {

    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });
    const deletionLog = fetchedLogs.entries.first();
    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
    const { executor, target } = deletionLog;
    let deleter;
    deleter = (target.id === message.author.id) ? executor : message.author;
    const messageContent = message.content === '' ? 'Embedded Message' : message.content;
    const description = `|${message.author.username}#${message.author.discriminator}|: ${messageContent}`;
    let deleteMessage = deleteEmbed(message, description, deleter);
    const guild = message.guild;
    guild.channels.fetch(config.ACTIVITY_CHANNEL_ID)
        .then(channel => { channel.send({ embeds: [deleteMessage] }) })
        .catch(console.error);
    
}

const methods = {
    commands: listCommands,
    invite: inviteCommand,
    usercount: userCountCommand,
    roleinfo: roleInfoCommand,
    post: postCommand,
    purge: purgeCommand,
    image: imageCommand,
    avatar: avatarCommand,
    reactFail: reactFail,
    singleDelete: singleDelete,
    unknownCommand: unknownCommand
}

export default methods;