let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} logo`
  let res = await fetch(global.API('lol', '/api/pixiv2', {
    query: text
  }, 'apikey'))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  let pint = json.data[Math.floor(Math.random() * json.data.length)];
  conn.sendFile(m.chat, pint, '', '© Liliana Bot', m, 0, { thumbnail: await (await fetch(pint)).buffer() })
}
handler.help = ['pixiv <pencarian>']
handler.tags = ['internet']
handler.command = /^(pixiv?)$/i
handler.limit = true
handler.register = true
module.exports = handler
