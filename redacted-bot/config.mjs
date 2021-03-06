export const config = {
    BOT_TOKEN: "xyz",
    BOT_ID: "xyz",
    SERVER_ID: "804809698389393429",
    PREFIX: "!r",
    ADMIN_ROLE_ID: "804810509622837299",
    INVITE_LINK: "Q2Hw3uRk2h",
    AUTO_ROLE_ID: "804810517633564743",
    USER_COUNT_CHANNEL_ID: "944578541893333022",
    BOT_CHANNEL_ID: "804810738979176450",
    ACTIVITY_CHANNEL_ID: "944713401660223538",
    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
}