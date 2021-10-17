require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client({intents: []});

client.once('ready', () => {
    console.log(`Client loggin as ${client.user.tag}`);
    client.user.setActivity({name: 'Zebra', type: 'LISTENING'});
});

client.login(process.env.TOKEN);