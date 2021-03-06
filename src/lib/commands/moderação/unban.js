module.exports = {
    run: async(msg) => {
        if (!isFlag(msg)) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível desbanir este usuário.`);
        const member = msg.bot.fetchUser(msg.args[0])
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar este usuário.`);
        msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, o usuário \`${member.username}\` foi desbanido com sucesso.`)
        .then(() => msg.guild.unban(member))
        .catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível desbanir este usuário.`))
    },
    conf:{ enable: true, cooldown: 30 },
    help: {
        name: 'unban',
        description: 'desbane alguém do servidor',
        usage: ['unban @usuário'],
        member: 'moderadores',
        category: 'moderação'
    }
}

function isFlag(msg) {
    const { Permissions } = require('discord.js');
    if (!msg.guild)
        return false
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    if(!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        if(!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    return true
}