const { EmbedBuilder } = require('discord.js')
const Parser = require('rss-parser');
const parser = new Parser()
const interactionCreate = require("../events/interactionCreate");
const Discord = require("discord.js")


module.exports = {
    name: "gsmbilgi",
    description: "gsm bilgi ",
    options:[
      {
        name: "gsmno",
        description: "kişinin telefon numarası",
        type: 3,
        required: true,
      },
    ],
    run: async (client, interaction, str) =>{
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "illegalplatform_hackerdede1_gsm"
              });
            //interaction.reply("Yükleniyor...")
            var adx = interaction.options.getString("gsmno")
            //
            con.query(`SELECT * FROM illegalplatform_hackerdede1_gsm WHERE gsm="${adx}"`, function (err, result) {
                let data = JSON.parse(JSON.stringify(result))
              if (err) throw err;
              data.map((o) => console.log(o.TC))
              //message.reply(require('util').inspect(result));
    
              if(data.length < 1) return interaction.reply({ content: "Görünüşe göre bir sonuç bulunamadı bunun sebebi aşağıdaki maddelerden biri olabilir. \n ・ Sorguladığınız numara yeni ise sistemimize kayıtlı olmayabilir \n ・ Numarayı yanlış girmiş olabilirsin numaranın başında 0 olmamalı ve sayılar birleşik olmalıdır", ephemeral: true })
              if(adx.startsWith('0')) return interaction.reply({ content: "numara 0 olmadan yazılmalıdır", ephemeral: true })
              let arr = []
              for ( const obj of result) {
                arr.push(obj.GSM)
              }
             data.map((o) => interaction.user.send({ content: `:tada: ${adx} numaraya ait bilgiyi buldum. \n ${o.TC}`}))

              }); 
            }
}

    






    