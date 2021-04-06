const Discord = require('discord.js')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const moment = require('moment')
const { fetching } = require('./../templates/wait')

const api = require('../classeviva/api')

module.exports.run = async (client, message, args) => {
    const m = await message.channel.send(fetching())
    circolari = await api.getNoticeboard(args[0] || 5)
    let embedCircolari = []
    circolari.forEach(circolare => {
        embedCircolari.push({ name: `${circolare.cntCategory} | ${moment(circolare.pubDT).format('DD/MM/YY HH:mm')}`, value: circolare.cntTitle })
    })
    m.edit(new Discord.MessageEmbed()
        .setTitle(`Ultime ${args[0] || 5} circolari`)
        .addFields(embedCircolari)
    )
}

module.exports.config = {
    name: 'circolari',
    aliases: ['ultimecircolari', 'avvisi', 'circolare'],
    enabled: true
}