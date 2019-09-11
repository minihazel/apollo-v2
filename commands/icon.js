const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let messageArray = message.content.split(/ +/g)
    let member = message.mentions.users.first()

    let membernotfound = new Discord.RichEmbed()
        .setAuthor(`Member could not be found`)
        .setDescription(`${member} could not be found.`)
        .setFooter(`Apollo V2`, message.guild.icon)

    let iconURLEmbed = new Discord.RichEmbed()
        .setAuthor(`ICON`)
        .setImage(member.avatarURL)

    if (!member) return message.channel.send(membernotfound)

    message.channel.send(iconURLEmbed)
}

module.exports.help = {
    name: "icon"
}
