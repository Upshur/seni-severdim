const { EmbedBuilder } = require('discord.js')
const Parser = require('rss-parser');
const parser = new Parser()



module.exports = {
    name: "ping",
    description: "bot'un sunucuda gecikme süresini atar",options:[],
    run: async (client, interaction) => {
        


        

        const { guildId , channel} = interaction;

        await interaction.reply(`Bot Anlık Ping ${client.ws.ping}`)

        
    }

}