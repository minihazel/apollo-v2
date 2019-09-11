const Discord = require('discord.js');
const request = require('request');
const botsettings = require('./botsettings.json');
const fs = require('fs');

const prefix = botsettings.prefix;
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop()  === `js`);
    if (jsfiles.length <= 0) {
        console.log(`No loadable commands!`);
        return;
    }
    console.log(`Loading ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded.`);
        bot.commands.set(props.help.name, props);
    })
});

bot.on('ready', async () => {

    console.log(`${bot.user.tag} is now running.`);

    bot.user.setPresence({
        game: {
            name: 'YouTube',
            type: 'WATCHING' // 0 PLAYING - 1 STREAMING - 2 LISTENING - 3 WATCHING
        },
        status: 'online' // online - idle - dnd - invisible
    })
});

bot.on('message', async (message) => {
	message.delete(100)
    if (message.author.bot) return;
	if (message.channel.type === `dm`) {

	}

    let messageArray = message.content.split(/ +/g);
    let command = messageArray[0];
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
});

bot.on('error', console.error);

bot.login(botsetings.token);
