const {MessageEmbed} = require('discord.js');


const constructEmbed = (args) => {

    const testEmbed = new MessageEmbed(args)
        .setDescription(args.content);

    args.channel.send({embeds: [testEmbed]});
}



module.exports = {
    constructEmbed
}