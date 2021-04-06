const Discord = require('discord.js')
const config = require('./../database/config.json')


module.exports.genericError = (title, description, content, color = config.embed.error.generic.defaultColor) => {
    if (content) {
        return new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(description || '')
            .setTitle('Errore: ' + title)
            .addFields(
                content
            )
    } else {
        return new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(description || '')
            .setTitle('Errore: ' + title)
    }
}

module.exports.insufficientPermissions = (roleId = config.permittedRoleId, color = config.embed.error.permission.defaultColor) => {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(config.embed.error.permission.insufficient.replace('{{roleId}}', roleId))
        .setTitle("Errore permessi")
}