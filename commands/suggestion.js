const Discord = require('discord.js');
const botsettings = require('../botsettings.json');
const prefix = botsettings.prefix;

module.exports.run = async (bot, message, args) => {
	const guild = bot.guilds.get(message.guild.id);

	const getchannel = guild.channels.find('name', 'get-channel');
	const setchannel = guild.channels.find('name', 'set-channel');

	let fullcommand
	let create = `create`;
	let reject = `reject`;
	let open = `open`;
	let accept = `accept`;
	let cmdid

	const messageArray = message.content.split(` `);
	const suggestion = messageArray.slice(2).join(` `);

	if (!args[1]) return message.channel.send(`Please choose one of four options:\n\`create\`\n\`reject\`\n\`open\`\n\`accept\``).then(msg => {
		msg.delete(4000)
	})
	if (!args[2]) return message.channel.send(`Please list a suggestion to display.`).then(msg => {
		msg.delete(4000)
	})

	if (args[1] === create) {
		fullcommand = `/suggestion create`;

		getchannel.send(`Would you like to create the following suggestion? Enter \`yes\` for yes. Enter \`no\` for no.`, {embed: {
			color: 11542655,
			title: `Confirm suggestion`,
			description: `${suggestion}`,
		}}).then(confirmation => {
			getchannel.awaitMessages(response => response.author.id === message.author.id, {
				max: 1,
				time: 30000,
				error: ['time'],
			}).then((collected) => {
				console.log(collected.first().content);

				if (collected.first().content === `Yes` || collected.first().content === `yes`) { // If the user would like to send said suggestion to the public

					setchannel.send({embed: {
						color: 11542655,
						author: {
							name: `Suggestion created by ${message.author.tag}`,
							icon_url: message.author.displayAvatarURL,
						},
						description: `**Description**: ${suggestion}`
					}}).then(msg => {
						msg.react(`👍`);
						msg.react(`👎`);

						msg.edit({embed: {
							color: 11542655,
							author: {
								name: `Suggestion created by ${message.author.username}`,
								icon_url: message.author.displayAvatarURL,
							},
							description: `**Description**: ${suggestion}`,
							footer: {
								text: `Suggestion ID: ${msg.id} | Open`,
							}
						}})
					});

					confirmation.delete(1000)
					collected.first().delete(1500)

				} else if (collected.first().content === `No` || collected.first().content === `no`) { // If the user does not want to send said suggestion to the public
					collected.first().delete();
					confirmation.delete();

				}

			})

		})


	} else if (args[1] === reject) {
		fullcommand = `/suggestion reject`;

		if (isNaN(args[2])) return message.channel.send(`Please provide an ID to fetch.`).then(msg => {msg.delete(3000)})
		cmdid = args[2];

		setchannel.fetchMessage(cmdid).then(msg => { // Fetch the message via the message ID provided
			console.log(msg.embeds[0]);
			msg.edit({embed: { // From line 92 to line 100 we get the embed properties of the message we fetch from set-channel
				color: 11542655,
				author: {
					name: msg.embeds[0].author.name,
					icon_url: msg.embeds[0].author.name.displayAvatarURL
				},
				description:  msg.embeds[0].description,
				footer: {
					text: `Suggestion ID: ${msg.id} | Rejected`
				}
			}})

			getchannel.send(`Suggestion ${msg.id} rejected.\n\nDescription: \`${msg.embeds[0].description.slice(17)}\``).then(msgv => {
				msgv.delete(10000)
			})
		})
	} else if (args[1] === open) {
		fullcommand = `/suggestion open`;

		if (isNaN(args[2])) return message.channel.send(`Please provide an ID to fetch.`).then(msg => {msg.delete(3000)})
		cmdid = args[2];

		setchannel.fetchMessage(cmdid).then(msg => { // Fetch the message via the message ID provided
			console.log(msg.embeds[0]);
			msg.edit({embed: { // From line 92 to line 100 we get the embed properties of the message we fetch from set-channel
				color: 11542655,
				author: {
					name: msg.embeds[0].author.name,
					icon_url: msg.embeds[0].author.name.displayAvatarURL
				},
				description:  msg.embeds[0].description,
				footer: {
					text: `Suggestion ID: ${msg.id} | Open`
				}
			}});

			getchannel.send(`Suggestion ${msg.id} opened.\n\nDescription: \`${msg.embeds[0].description.slice(17)}\``).then(msgv => {
				msgv.delete(10000);
			})
		})
	} else if (args[1] === accept) {
		fullcommand = `/suggestion accept`;

		if (isNaN(args[2])) return message.channel.send(`Please provide an ID to fetch.`).then(msg => {msg.delete(3000)})
		cmdid = args[2];

		setchannel.fetchMessage(cmdid).then(msg => { // Fetch the message via the message ID provided
			console.log(msg.embeds[0]);
			msg.edit({embed: { // From line 92 to line 100 we get the embed properties of the message we fetch from set-channel
				color: 11542655,
				author: {
					name: msg.embeds[0].author.name,
					icon_url: msg.embeds[0].author.name.displayAvatarURL
				},
				description:  msg.embeds[0].description,
				footer: {
					text: `Suggestion accepted`
				}
			}});

			msg.clearReactions();
			getchannel.send(`Suggestion ${msg.id} accepted by ${message.author.tag}.\n\nDescription: \`${msg.embeds[0].description.slice(17)}\``).then(msgv => {
				msgv.delete(10000);
			})
		})

	}

}

module.exports.help = {
	name: "suggestion"
}
