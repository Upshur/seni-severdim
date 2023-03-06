const fs = require('fs');
const { Client, Collection, GatewayIntentBits} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client =  new Client({
    fetchAllMembers: true,
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildIntegrations,
    ]
});

const { token } = require('./config.json')
global.client = client
client.commands = (global.commands =[]);
fs.readdir("./commands/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);


        client.commands.push({
            name: props.name.toLowerCase(),
            description: props.description,
            options: props.options,
        })
        console.log(`KOMUT HAZIR : ${props.name}`);
    });
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) =>{
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log(`EVENT HAZIR : ${eventName}`);
        client.on(eventName, (...args) =>{
            event(client, ...args);
        })
    })
})


client.on("ready", async () => {
    const rest = new REST({ version: 9}).setToken(token)
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.commands,
     
    });

  } catch (error) {
    console.error(error);
  }
});

client.login(token)