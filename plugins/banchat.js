let handler = async (m, { conn, isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!isOwner) {
      global.dfail('owner', m, conn)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    else who = m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, conn)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }

  try {
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = true
    else global.db.data.users[who].banned = true
    m.reply(`${conn.user.name} tidak aktif dichat ${conn.getName(who) == undefined ? 'ini' : conn.getName(who)}.`)
  } catch (e) {
    throw `nomor tidak ada didatabase!`
  }
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(chat)?$/i
handler.register = true
module.exports = handler