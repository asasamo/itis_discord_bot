const Discord = require('discord.js')
const config = require('./../database/config.json')
const moment = require('moment')
const db = require('./../dbHandler')
const { getAgenda } = require('../classeviva/api')
const errorTemplates = require('./../templates/error')
const { fetching } = require('./../templates/wait')

module.exports.run = async (client, message, args) => {
    var date = moment(args[2] + '-' + args[1] + '-' + args[0])

    if (!args[0]) {
        date = moment().add(1, 'day')
    } else if (!moment(args[2] || '00' + '-' + args[1] || '00' + '-' + args[0] || '00').isValid()) {
        message.reply(errorTemplates.genericError('Data non valida.', `La data deve essere in formato "GG MM AAAA"`))
        return
    }

    const m = await message.channel.send(fetching())
    var agenda = await getAgenda(date)
    var agendaEmbed = []
    agenda.forEach((event) => {
        agendaEmbed.push({ name: event.notes || '~Nessun titolo~', value: event.authorName + ' - ' + moment(event.evtDatetimeEnd).format('DD-MM-YY') })
    })

    m.edit(new Discord.MessageEmbed()
        .setTitle(`Compiti fino al ${date.format('DD-MM-YYYY')}`)
        .addFields(agendaEmbed)
    )
}

module.exports.config = {
    name: 'agenda',
    aliases: ['compiti'],
    enabled: true
}