import {MessageEmbed} from 'discord.js';
import {config} from '../config.mjs';

export const constructEmbed = (args) => {

    const testEmbed = new MessageEmbed(args).setColor('RED').setDescription(args.content.slice(8));
    args.channel.send({embeds: [testEmbed]});

}

export const roleInfoEmbed = async (args) => {

    var roleInfoList = "";

    let allRoles = await args.guild.roles.fetch()

    allRoles.sort((a, b) => b.position - a.position).map(r => r).join(", ");
    
    allRoles.forEach(role => {
        let members = ''
        role.members.forEach(member=> {
            members = members + `${member.user.username}`});
        roleInfoList = roleInfoList + role.toString() + " - ID: **" + role.id + "** - Users: **" + role.members.size + "**\n"
    });

    const testEmbed = new MessageEmbed().setColor('RED').setTitle(`Roles - IDs - Users`).setDescription(roleInfoList).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    args.channel.send({embeds: [testEmbed]});

}

export const purgeEmbed = (args, numberOfMessages, description) => {

    let embed = new MessageEmbed().setColor('RED').setTitle(`${numberOfMessages} Messages purged in #${args.channel.name} `).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    return embed;

}

export function buildDescription(messages) {

    let descriptionBuilder = '';
    let messageCount = 0;

    messages.map((message) => {
            messageCount = messageCount + 1;
            if (message.author.id === config.BOT_ID) {
                descriptionBuilder = descriptionBuilder.concat('',`|${message.author.username}#${message.author.discriminator}|: Embedded Message\n`);
            } else {
                descriptionBuilder = descriptionBuilder.concat('',`|${message.author.username}#${message.author.discriminator}|: ${message.content}\n`);
            }
    })

    return {description: descriptionBuilder, number: messageCount};

}


export const deleteEmbed = (args,description,executor) => {

    let embed;

    if (executor) {
        embed = new MessageEmbed().setColor('RED').setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${executor.username}#${executor.discriminator}`, iconURL: `${executor.avatarURL()}` });
    }
    
    else {
        embed = new MessageEmbed().setColor('RED').setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    }

    return embed;

}