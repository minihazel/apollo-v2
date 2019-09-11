const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	let messageArray = message.content.split(/ +/g)
    let member = message.mentions.users.first()

    if (!args[1]) return message.channel.send({embed: {
        color: 11542655, // -> https://www.colorhexa.com/b0207f
        title: message.author.tag,
        image: {
            url: message.author.avatarURL
        }
    }})

    if (!member) return message.channel.send({embed: {
        color: 11542655,
        title: `That user could not be found.`
    }}).then(msg => {
        msg.delete(3000)
    })

    message.channel.send({embed: {
        color: 11542655,
        title: `${member.tag}`,
        image: {
            url: member.avatarURL
        }
    }})
}

module.exports.help = {
	name: `avatar`
}
