const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "close",
  aliases: [],
  run: async (message, args, client) => {
    
    let data = db.get(`ticket_${message.channel.id}`)
    
    if (data === null) return message.channel.send(":x: Ini bukan Saluran Tiket.")
    
    if (!config.roles) return console.log("Tidak Ada Peran yang Ditambahkan di Config.")
    
    if (!Array.isArray(config.roles)) return console.log("Peran bukan Array di Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: Tidak ada izin!")
   
    let user = client.users.cache.get(data)
    
    let channel = message.channel
    
    require("../execute/close.js")(user, channel)
    
  }
}