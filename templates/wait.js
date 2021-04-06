const Discord = require('discord.js')
const config = require('./../database/config.json')


module.exports.fetching = (info = "Caricamento...", color = config.embed.error.generic.defaultColor) => {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(info)
}