require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({intents:[]});
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

commandFiles.forEach(commandFile => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
});

client.once('ready', () => {
    console.log(`Client loggin as ${client.user.tag}`);
    client.user.setActivity({name: 'Zebra', type: 'LISTENING'});
});

client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if(command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if(interaction.deferred || interaction.replied) {
                    interaction.editReply('Es ist ein Fehler aufgestreten!');
                }else {
                    interaction.reply('Es ist ein Fehler aufgestreten!');
                };
            };
        };
    };
});

client.login(process.env.TOKEN);