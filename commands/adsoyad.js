const interactionCreate = require("../events/interactionCreate");
const Parser = require('rss-parser');
const { SlashCommandBuilder } = require("discord.js");
const parser = new Parser()
const { Routes } = require('discord-api-types/v9')
const { request } = require('undici')
const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const jsonToTxt = require("json-to-txt");
const Discord = require("discord.js")
module.exports = {
    
    name: "adsoyad",
    description: "ad soyad bilgi ",
    options:[
        {
            name: "adı",
            description: "sorgulanacak kişi ismi",
            type: 3,
            required: true,     
                    
        },
        {
            name: "soyadı",
            description : "sorgulanacak kişi soyadı",
            type: 3,
            required: true,
        }
       
    ],
    run: async (client, interaction, str) =>{

        
        const ad = interaction.options.getString('adı');
        const soyad = interaction.options.getString('soyadı');

		const query = new URLSearchParams({  ad });
        const query2 = new URLSearchParams({ soyad });
        
		const dictResult = await request(`http://localhost/adsoyadsorgu`);
		//const list  = await dictResult.body.text();
     
        const asa = await dictResult.body.text()//.str.slice(0, 2000);
        
        const embedmesaj = new EmbedBuilder()
        
        .setColor("DarkGrey")
        .setTitle("SONUÇLAR ;")
        .setDescription(`${asa}`)
        .setFooter({text:`%64 Bot Developed By Mars`})
        await interaction.reply({ embeds: [embedmesaj] });

        //interaction.reply(`${asa}`)
        
        //fs.writeFileSync("data.json", JSON.stringify(asa)
        

        
        // Convert the JSON data to a text file
        //jsonToTxt("data.json", "data.txt");


        
        //const ms = await JSON.stringify(list)
       
        //var mars = JSON.parse(ms)
          



        
}
}
