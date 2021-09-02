const discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "anonymous",
  aliases: ["anonreply", "anon", "ar"],
  run: async (message, args, client) => {
    
    let data = db.get(`ticket_${message.channel.id}`)
    
    if (data === null) return message.channel.send(":x: Ini bukan Saluran Tiket.")
    
    if (!config.roles) return console.log("Tidak Ada Peran yang Ditambahkan di Config.")
    
    if (!Array.isArray(config.roles)) return console.log("Peran bukan Array di Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: Tidak ada izin!")
    
    if (!args[0] && !message.attachments) return message.channel.send(":x: Tidak Ada Konten yang Diberikan untuk Dikirim.")
    
    let user = client.users.cache.get(data)
    
    if (!user) return message.channel.send(":x: Ups!\nSaya tidak dapat menemukan Pengguna.\nMungkin Pengguna telah Meninggalkan Server.")
    
    let channel = user.dmChannel || await user.createDM()
   
   if (!args[0] && message.attachments.array().length === 0) return message.channel.send(":x: Tidak ada Konten atau Lampiran yang Disertakan.")
   
   let anonymous = true
    
    require("../execute/senddm.js")(message, args, user, channel, anonymous, client)
    
  }
}