const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const {HelperClient} = require("discord-helper.js");



/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {


    let commands = client.application.commands;



    for (const dir of readdirSync("./Commands/")) {
        const commands2 = readdirSync(`./Commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (const file of commands2) {
            let pull = require(`../Commands/${dir}/${file}`);

            await client.commands.set(pull.name, pull);

            let { name, options, description, perm } = pull;



            await new HelperClient(client).GlobalcommandRegisterAsync({name, description, options, permission: perm});
        }
    }
}