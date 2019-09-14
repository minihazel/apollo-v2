const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
	message.delete(250)

    let messageArray = message.content.split(/ +/g)
    let quoteid = args[1]
	let additional = messageArray.slice(2).join(' ')

	message.channel.fetchMessage(quoteid).then(msg => {

		if (!args[2]) {
			console.log(msg)
			message.channel.send({embed: {
				color: 16725044,
				author: {
					name: msg.author.username,
					icon_url: msg.author.displayAvatarURL
				},
				description: msg.content,
				timestamp: new Date()
			}})
		} else {
			console.log(msg)
			message.channel.send(additional, {embed: {
				color: 16725044,
				author: {
					name: msg.author.username,
					icon_url: msg.author.displayAvatarURL
				},
				description: msg.content,
				timestamp: new Date()
			}})
		}

	}).catch((error) => {
		console.log(error)
		message.channel.send(`Could not retrieve any message from ID ${quoteid}.`).then(msg => {
			msg.delete(6000)
		})
	})

}

module.exports.help = {
    name: "quote"
}
