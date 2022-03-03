import {MessageEmbed} from 'discord.js';
import {config} from '../config.mjs';

export const constructEmbed = (args) => {

    const testEmbed = new MessageEmbed(args).setDescription(args.content.slice(8));
    args.channel.send({embeds: [testEmbed]});

}

export const roleInfoEmbed = (args) => {

    let rolemap = args.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(", ");

    var roleInfoList = "";
    args.guild.roles.cache.forEach(role => roleInfoList = roleInfoList + role.toString() + " - ID: " + role.id + " - Users: " + role.members.size + "\n");

    const testEmbed = new MessageEmbed().setTitle(`Roles - IDs - Users`).setDescription(roleInfoList).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    args.channel.send({embeds: [testEmbed]});

}

export const purgeEmbed = (args, numberOfMessages, description) => {

    let embed = new MessageEmbed().setTitle(`${numberOfMessages} Messages purged in #${args.channel.name} `).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
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
        embed = new MessageEmbed().setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${executor.username}#${executor.discriminator}`, iconURL: `${executor.avatarURL()}` });
    }
    
    else {
        embed = new MessageEmbed().setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    }

    return embed;

}