const {MessageEmbed} = require('discord.js');


const constructEmbed = (args) => {

    console.log(args.content);
    
    const testEmbed = new MessageEmbed()
        .addFields({ name: '', value: args.content },)
    args.channel.send({embeds: [testEmbed]});



}



module.exports = {
    constructEmbed
}