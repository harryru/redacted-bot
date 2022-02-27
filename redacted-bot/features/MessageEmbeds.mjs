import {MessageEmbed} from 'discord.js';
import {config} from '../patinoConfig.mjs';

export const constructEmbed = (args) => {

    const testEmbed = new MessageEmbed(args)
        .setDescription(args.content.slice(8));

    args.channel.send({embeds: [testEmbed]});
}

export const purgeEmbed = (args,numberOfMessages,description) => {
    let embed = new MessageEmbed().setTitle(`${numberOfMessages} Messages purged in #${args.channel.name} `).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    return embed;
}

export function buildDescription(messages){
    let descriptionBuilder = ''
    messages.map((message) => {
            if(message.author.id === config.BOT_ID){
                descriptionBuilder = descriptionBuilder.concat('',`|${message.author.username}#${message.author.discriminator}|: Embedded Message\n`);
            }else{
                descriptionBuilder = descriptionBuilder.concat('',`|${message.author.username}#${message.author.discriminator}|: ${message.content}\n`);
            }
    })
    return descriptionBuilder;
}


export const deleteEmbed = (args,description,executor) => {
    let embed;
    if(executor){
        embed = new MessageEmbed().setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${executor.username}#${executor.discriminator}`, iconURL: `${executor.avatarURL()}` });
    }else{
        embed = new MessageEmbed().setTitle(`Message deleted in #${args.channel.name}`).setDescription(description).setAuthor({ name: `${args.author.username}#${args.author.discriminator}`, iconURL: `${args.author.avatarURL()}` });
    }
    return embed;

}

