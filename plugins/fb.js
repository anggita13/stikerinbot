const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://www.facebook.com/alanwalkermusic/videos/277641643524720`
  if (/^https?:\/\/.*(fb.watch|facebook.com)/i.test(m.text)) throw `url salah`

  let res = await fetch(API('lol', '/api/facebook', { url: args[0] }, 'apikey'))
  if (!res.ok) throw error
  let json = await res.json()
  if (!json.status) throw json
  await m.reply(wait)
  await conn.sendFile(m.chat, json.result, '',`\n\n© Liliana Bot`, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

handler.limit = true

module.exports = handler
