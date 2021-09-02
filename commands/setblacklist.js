const discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "setblacklist",
  aliases: [],
  run: async (message, args, client) => {
    
    if (!config.roles) return message.channel.send(":x: Tidak ada ModRole yang ditambahkan di Config.")
    
    if (!Array.isArray(config.roles)) return message.channel.send(":x: ModRole bukan Array di Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: Tidak ada izin!")
    
    if (!args[0]) return message.channel.send(":x: Tidak Ada Argumen Pengguna yang Diberikan.")
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    
    if (!user) return message.channel.send(":x: Tidak dapat menemukan Pengguna yang Anda cari.")
    
    let data = db.get(`blacklist_${user.id}`)
    
    if (!args[1]) return message.channel.send(":x: Silakan Masukkan Status Daftar Hitam.\n\`benar\` or \`Salah\`.")
    
    if (args[1].toLowerCase() === "benar") {
      if (data === benar) return message.channel.send(":x: The User is already Blackisted.")
      message.channel.send("Successfully Blacklisted User.")
      db.set(`blacklist_${user.id}`, benar)
    }
    
  else if (args[1].toLowerCase() === "Salah") {
      if (data === null) return message.channel.send(":x: The User is not Blacklisted.")
      message.channel.send("Successfully Unblacklisted User.")
      db.delete(`blacklist_${user.id}`)
    }
    
    else {
      message.channel.send(":x: Status Tidak Valid Diberikan.\nSilakan gunakan \`benar\` or \`Salah\`.")
    }
    
  }
}