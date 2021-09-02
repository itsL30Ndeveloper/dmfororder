const discord = require("discord.js")
const db = require("quick.db")

module.exports = async (user, channel) => {
  
  let userdata = db.get(`ticket_${user.id}`)
  
  let channeldata = db.get(`ticket_${channel.id}`)
  
  let embed = new discord.MessageEmbed()
  .setTitle("Tiket Ditutup")
  .setColor("RANDOM")
  .setDescription("Tiket Anda telah Ditutup.\nMenanggapi sekarang akan membuat tiket baru.\n\nJangan ragu untuk menghubungi kami kembali jika ingin memesan produk kami.\nTerima kasih telah membeli di SKY STORE.")
  
  if (userdata !== null) {
    user.send(embed).catch(() => {})
    db.delete(`ticket_${user.id}`)
  }
  
  if (channeldata !== null) {
    
    channel.send("Saluran Tiket ini telah Ditutup.\nSaluran akan Dihapus dalam 10 Detik.")
    db.delete(`ticket_${channel.id}`)
    
    setTimeout(() => {
    channel.delete()
    }, 10000)
    
  }
  
}