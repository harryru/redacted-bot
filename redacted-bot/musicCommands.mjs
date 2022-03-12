/* 
 * File Containing Music Functions....
*/
import { QueryType, QueueRepeatMode } from "discord-player";
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { config } from "./config.mjs";
import { reactFail, reactComplete } from "./commands.mjs";

export const playCommand = async (message, args) => {

    if (!args[0]) {
        message.channel.send(`Please enter a valid search ${message.author}.`);
        reactFail(message);
        return;
    }

    const res = await player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) {
        message.channel.send(`No results found ${message.author}.`);
        reactFail(message);
        return;
    }

    const queue = await player.createQueue(message.guild, {
        leaveOnEnd: false,
        metadata: message.channel
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild.id);
        return message.channel.send(`Can't join the voice channel ${message.author}.`);
    }

    await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'song'}.`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    reactComplete(message);

    if (!queue.playing) await queue.play();

}

export const playingCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

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
    reactComplete(message);

}

export const pauseCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);

    if (!queue) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    const success = queue.setPaused(true);

    success ? reactComplete(message) : reactFail(message);
    return message.channel.send(success ? `Current music ${queue.current.title} paused` : `Something went wrong ${message.author}.`);

}

export const resumeCommand = async (message, args, client) => {

    const queue = player.getQueue(message.guild.id);
    if (!queue) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    const success = queue.setPaused(false);

    success ? reactComplete(message) : reactFail(message);
    return message.channel.send(success ? `Current music ${queue.current.title} resumed` : `Something went wrong ${message.author}.`);

}

export const previousCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    if (!queue.previousTracks[1]) {
        message.channel.send(`There was no music played before ${message.author}.`);
        reactFail(message);
        return;
    }

    await queue.back();

    reactComplete(message);
    message.channel.send(`Playing the **previous** track`);
}

export const clearCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    if (!queue.tracks[0]) {
        message.channel.send(`No music in the queue after the current one ${message.author}.`);
        reactFail(message);
        return;
    }

    await queue.clear();

    reactComplete(message);
    message.channel.send(`The queue has just been cleared.`);
}

export const loopCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    if (args.join('').toLowerCase() === 'queue') {
        if (queue.repeatMode === 1) {
            message.channel.send(`You must first disable the current music in the loop mode ${message.author}.`);
            reactFail(message);
            return;
        }

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

        success ? reactComplete(message) : reactFail(message);
        return message.channel.send(success ? `Loop mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly` : `Something went wrong ${message.author}.`);
    } else {
        if (queue.repeatMode === 2) {
            message.channel.send(`You must first disable the current queue in the loop mode ${message.author}.`);
            reactFail(message);
            return;
        }

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

        success ? reactComplete(message) : reactFail(message);
        return message.channel.send(success ? `Loop mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the current music will be repeated endlessly.` : `Something went wrong ${message.author}.`);
    };

}

export const queueCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    if (!queue.tracks[0]) {
        message.channel.send(`No music in the queue after the current one ${message.author}.`);
        reactFail(message);
        return;
    }

    const embed = new MessageEmbed();
    const methods = ['', '🔁', '🔂'];

    embed.setColor('RED');
    embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
    embed.setAuthor(`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, message.author.avatarURL({ size: 1024, dynamic: true }));

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by: ${track.requestedBy.username})`);

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

    embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

    embed.setTimestamp();
    embed.setFooter('', message.author.avatarURL({ dynamic: true }));

    message.channel.send({ embeds: [embed] });
    reactComplete(message);
}

export const shuffleCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    if (!queue.tracks[0]) {
        message.channel.send(`No music in the queue after the current one ${message.author}.`);
        reactFail(message);
        return;
    }

    await queue.shuffle();

    reactComplete(message);
    return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) !`);
}

export const skipCommand = async (message, args, client) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing) {
        message.channel.send(`No music currently playing ${message.author}.`);
        reactFail(message);
        return;
    }

    const success = queue.skip();

    success ? reactComplete(message) : reactFail(message);
    return message.channel.send(success ? `Current music ${queue.current.title} skipped` : `Something went wrong ${message.author}.`);
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