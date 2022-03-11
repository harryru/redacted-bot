/* 
 * File Containing Music Functions....
*/
import { QueryType, QueueRepeatMode } from "discord-player";

import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { config } from "./config.mjs";

export const playCommand = async (message, args) => {

    if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

    const res = await player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

    const queue = await player.createQueue(message.guild, {
        metadata: message.channel
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild.id);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }

    await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();

}

export const playingCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    const track = queue.current;

    const embed = new MessageEmbed();

    embed.setColor('RED');
    embed.setThumbnail(track.thumbnail);
    embed.setAuthor({ name: `${track.title}`, iconURL: `${message.author.avatarURL({ size: 1024, dynamic: true })}` });


    const methods = ['disabled', 'track', 'queue'];

    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    embed.setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`);

    embed.setTimestamp();
    embed.setFooter('', message.author.avatarURL({ dynamic: true }));


    message.channel.send({ embeds: [embed] });


}

export const pauseCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);

    if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    const success = queue.setPaused(true);

    return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);

}

export const resumeCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    const success = queue.setPaused(false);

    return message.channel.send(success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${message.author}... try again ? ❌`);

}

export const previousCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (!queue.previousTracks[1]) return message.channel.send(`There was no music played before ${message.author}... try again ? ❌`);

    await queue.back();

    message.channel.send(`Playing the **previous** track ✅`);
}

export const clearCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

    await queue.clear();

    message.channel.send(`The queue has just been cleared 🗑️`);
}

export const loopCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (args.join('').toLowerCase() === 'queue') {
        if (queue.repeatMode === 1) return message.channel.send(`You must first disable the current music in the loop mode (${client.config.app.px}loop) ${message.author}... try again ? ❌`);

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

        return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.author}... try again ? ❌`);
    } else {
        if (queue.repeatMode === 2) return message.channel.send(`You must first disable the current queue in the loop mode (${client.config.app.px}loop queue) ${message.author}... try again ? ❌`);

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

        return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂` : `Something went wrong ${message.author}... try again ? ❌`);
    };

}

export const queueCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

    const embed = new MessageEmbed();
    const methods = ['', '🔁', '🔂'];

    embed.setColor('RED');
    embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
    embed.setAuthor(`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

    embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

    embed.setTimestamp();
    embed.setFooter('', message.author.avatarURL({ dynamic: true }));

    message.channel.send({ embeds: [embed] });
}

export const shuffleCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

    await queue.shuffle();

    return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
}

export const skipCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

    const success = queue.skip();

    return message.channel.send(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ❌`);
}


const musicMethods = {
    play: playCommand,
    playing: playingCommand,
    pause: pauseCommand,
    resume: resumeCommand,
    previous: previousCommand,
    clear: clearCommand,
    loop: loopCommand,
    queue: queueCommand,
    shuffle: shuffleCommand,
    skip: skipCommand
}


export default musicMethods;