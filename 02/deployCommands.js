require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 
const commands = [];

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`);
    commands.push(command.data.toJSON());
});

const restClient = new REST({ version: "9" }).setToken(process.env.TOKEN);

restClient.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID),{
    body: commands
}).then(() => console.log("Sucessfully registered Commands!")).catch(console.error);