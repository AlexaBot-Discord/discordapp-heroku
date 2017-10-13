const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = (config.prefix);

//const o = message.guild.owner
//const attach = new Discord.Attachment("anthing","https://pbs.twimg.com/profile_images/804251407582892032/04QaIESj_400x400.jpg");

client.on("ready", () => {
    console.log("I'm Online\nI'm Online");
});
client.on("ready", () => {

    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    //client.user.setGame("test");

    client.user.setPresence({ game: { name: "Use--help to get started || Playing on 44 servers" } })
});
//

client.on("presenceUpdate", (oldMember, newMember) => {
    let guild = newMember.guild;
    let playRole = guild.roles.find("name", "Guild");
    if (!playRole) return;

    if (newMember.user.presence.game && newMember.user.presence.game.name === ("Use --help to get started || Playing on 44 servers")) {
        newMember.addRole(playRole);
    } else if (!newMemeber.user.presence.game && newMember.roles.has(playRole.id)) {
        newMember.removeRole(playRole);
    }
});

client.on("guildCreate", guild => {
    //This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);

    //client.user.setGame(`on ${client.guilds.size} servers`);
});


//Kick this member from the guild.

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



client.on("message", message => {
    if (message.author === client.user) return;

    if (message.content === (prefix + "ping")) {
        message.channel.send("Ping? 🏓 ").then(m => m.edit(`🏓 Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.trunc(client.ping)}ms!`));
    }
    if (message.content.startsWith(prefix + "jj")) {
        message.reply("bye");
    }
    if (message.content === (prefix + "on")) {
        const y = message.guild.owner;
        message.reply(y);
    }
    if (message.content === (prefix + "sssss")) {
        message.channel.send("ddddddd");
    }
    if (message.content === (prefix + "invite")) {
        message.channel.send({
            embed: {
                title: "Invite The Bot",
                color: 3447003,
                description: "https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=356753178295009281",
            }
        });
    }
    if (message.content === (prefix + "cmd")) {
        message.channel.send({
            embed: {
                title: "help",
                color: 3447003,
                description: "**usage:** __--help__" + " **description:** __Sends a help command__",
            }
        });
    }
    if (message.content === (prefix + "botid")) {
        message.channel.send(client.user.id); // bot id
        console.log("works");
    }
    if (message.content === (prefix + "log")) {
        message.reply(message.guild.fetchAuditLogs);
    }
    if (message.content === (prefix + "guilds")) {
        console.log("I am in" + (client.guilds.size) + " guilds!!");
        message.channel.send("I am in " + (client.guilds.size) + " guilds yay");
    }
    if (message.content === (prefix + "shutdown")) {
        message.channel.send("shutdown by <@" + message.author.id + ">");
        message.channel.send({
                embed: {
                    color: 3447003,
                    description: "shutting down good bye 👋"
                }
            })
            .then(client.user.destroy)
            .then(process.exit)
            .catch(process.exit);
    }
    if (message.content === (prefix + "botavatar")) {
        // Send the user's avatar URL
        message.reply(client.user.avatarURL);
    }
    if (message.content === (prefix + "restart")) {
        message.channel.send("restarting").then(message => {
            process.exit()
        })
    }
    if (message.content === (prefix + "o")) {
        message.author.send(message.guild.owner.id);
        message.author.send("This is the owners ID.");
    }
    if (message.content === (prefix + "oo")) {
        message.author.send("this is the name of the owner" + (message.guild.owner));
        message.author.send("This is the owners name.");
    }
    if (message.content === (prefix + "guildid")) {
        message.author.send(`This is the id of this guild  **${message.guild.name}** -  **${message.guild.id}** `);
    }
    if (message.content === (prefix + "members")) {
        message.channel.send(` There are **${message.guild.memberCount}** members on this server.`)
    }
    if (message.content === (prefix + "c")) {
        message.channel.send(` channels ${client.channels.size}`)
    }
    if (message.content === (prefix + "d")) {
        message.channel.send("Ping?").then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.trunc(client.ping)}ms!`));
    }
    if (message.content === (prefix + "foo")) {
        let modRoles = message.guild.roles.find("name", "Moderators");
        if (message.member.roles.has(modRoles.id)) {
            message.channel.send("bar")
        } else {
            message.reply("You pleb dont have access to use foo")
        }
    }
    if (message.content === (prefix + "funny")) {
        message.reply(":smile: Hey I once saw a man that had an axe and he dropped it on his foot because he thought his foot was the wood. :smile:")
    }
    if (message.content === (prefix + "/ance")) {
        //let modRole = message.guild.roles.find("name", "Moderators");
        let ownerRole = message.guild.roles.find("name", "Creator");
        const args = message.content.split(" ");
        //if(message.member.roles.has(modRole.id))
        if (message.member.roles.has(ownerRole.id)) {
            let announcement = args.join(" ");
            const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField(`New Announcement by ${message.author.username}`, `${announcement}`);
            client.channels.find("name", "bot_testing_room_2").send(embed);
            message.channel.send(`:ok_hand: Annoucement sent to #bot_testing_room_2`);
        } else {
            message.channel.send("**Error:** \n You dont have permission 'Moderators' to announce");
        }
    }



    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    if (message.content === (prefix + "ownerid")) {
        const owner = message.guild.ownerID; //owner.user.id
        if (message.author.id === (owner)) { //message.author.username or tag
            console.log("owner id has been sent to " + (message.author.username) + "via direct messages");
            message.author.send("This is the owner's ID in" + (client.guild.name));
            message.author.send(message.author.id);
            message.reply("Check my direct messages. You will find the ID of the owner of the guild!!"); // stuff
        } else {
            message.channel.send(owner);
        }


        ///////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////

        //other stuff

        //const oo = message.guild.owner;
        //if(message.content === (prefix + "owner")) {
        //message.channel.send(oo);
        //console.log("owner name is excuted");
        //}

        ///////////////////////////////////


        // if(message.content.startsWith(prefix + "ge")) {
        //  message.channel.send(owner.user.id); //member id
        //  }
        if (message.content.startsWith(prefix + "purge")) {
            // This command removes all messages from all users in the channel, up to 100.

            // get the delete count, as an actual number.
            const args = message.content.split(" ");
            const deleteCount = parseInt(args[0], 10);

            // Ooooh nice, combined conditions. <3
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

            // So we get our messages, and delete them. Simple enough, right?
            const fetched = message.channel.fetchMessages({ count: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        }

        //if(message.content.startsWith(prefix + "rr")) {
        //message.channel.send(owner);

    }
});
//if(!message.content.startsWith(ownerID)) return;
//if(message.content.startsWith(prefix + "count"))
//{
//  message.content.send("There is" + ${client.guilds.size} + "members on the server")

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////












//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////





client.on("message", message => {

});

//<RichEmbed>.setTitle('title here')


//const msg = a wa it msg.channel.send("hello");
//msg.edit("bye");



//const game = {name: "with code"}; // sets game as "Playing with code"
//const streamingGame = {type: 1, name: "something", url: "https://www.twitch.tv/an_idiots_guide"}; // "Streaming"
// note: streaming status requires a valid twitch url:
//       ex. "http://twitch.tv/channel"
//client.User.setGame(game); // playing
//client.User.setGame("with code"); // playing
//client.User.setGame(streamingGame); // streaming

//client.on("message", (message) => {
//  if (message.content.startsWith(prefix + "kick")) {
//    const modRole = message.guild.roles.find("name", "Administrators");
//  if (!message.member.roles.has(modRole.id)) {
//    return message.reply("u dont have perms to use");
// }
//if (message.mentions.users.size === 0) {
//  return message.reply("Plz mention");
/// }
//let kickMember = message.guild.member(message.mentions.users.first());
//  if (!kickMember) {
//        return message.reply("not valid user");
//      }
//        if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
//            return message.reply("dont have perms kick members");
//}
// kickMember.kick().then(member => {
//   message.reply(`${message.user.username} was succesfully kicked.`);
//   }).catch(e => {
//     console.error(e);
//    });
//  }

//});
//Easy way to get member object though mentions
// Kick





client.on("message", message => {
    if (message.content.startsWith(prefix + "kick")) {
        const modRole = message.guild.roles.find("name", "Administrators");
        if (!message.member.roles.has(modRole.id)) {
            return message.reply("u dont have perms to use");
        }
        if (message.mentions.users.size === 0) {
            return message.reply("Plz mention");
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.reply("not valid user");
        }
        if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("dont have perms kick members");
        }
        kickMember.kick();
    }
});
//.then(member => {
// message.reply(`${message.user.username} was succesfully kicked.`)
//  }).catch(error => {
//    console.error(error);










//client.on("message", message => {
//if (message.content === (prefix + "nn") {
// const modRole = message.guild.roles.find("name", "Moderators"); {
//if (message.member.roles.has(modRole.id)) {
//   const announcement = args.join(" ");
//  const embed8 = new Discord.RichEmbed()
//   .setColor(0x00AE86)
// .setTimestamp()
// .addField("`New Announcement by`" + (message.author.username) + (announcement))
//client.channels.find("name", "bots").send(embed8);
//message.channel.send(`:ok_hand: Annoucement sent to #bots`)
//  } else { // /n next to : **
//   message.channel.send("**Error:** You dont have permission 'Moderators' to announce")
//  }
// }
// });

client.on("message", message => {
    if (message.content.startsWith(prefix + "test")) {
        message.channel.send("hello!").then(message => console.log(`Sent message: ${message.channel.user} - ${message.content}`))
            .catch(message.channel.user);
    }
});


client.on("message", message => {
    if (message.content === (prefix + "help")) {
        const embed = new Discord.RichEmbed()
            .setAuthor("", "https://pbs.twimg.com/profile_images/745364940425297920/B2p6wzaH_400x400.jpg")
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(2003434)
            .setFooter("Requested by :: " + (message.author.tag) + " 😏 © CoolFellowship", "https://images-ext-2.discordapp.net/external/sdN1GxpFdBXGmYG6sNpAMM7wgUv1yTLAqNuzFldJigA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/356753178295009281/da0467cb9136a00bff97ae71e84fab8d.png?width=250&height=250")
            .setImage("https://yt3.ggpht.com/-z0X1BliEBkY/AAAAAAAAAAI/AAAAAAAAAAA/CA56Q4VaIi4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg")
            .setThumbnail("http://joyfestival.co.uk/wp-content/uploads/2017/03/Joy-2017-home-logo.png")
            /*``
             * Takes a Date object, defaults to current date.
             */
            .setTimestamp()
            //.setAttachment(attach)
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .addField("Help Commands ",
                "** Can be used by anyone **")
            .addField("**usage:** --help",
                "**description:** Showing this message", false)
            /*
             * Inline fields may not display as inline if the thumbnail and/or image is too big.
             */
            .addField("**usage:** --shutdown (Bot Owner Only)",
                "**description:** Shuts down the bot (Bot Owner Only)", false)
            /*
                   * Blank field, useful to create some space.
                   .addBlankField(true)
                   */

        .addField("**usage:** --invite ",
                "**description:** Embeds an invite link to invite the bot to your guild.", false)
            .addField(" **usage: ** --ping",
                "**description: ** A regular ping command", false)
            .addField(" **usage: ** --botavatar",
                "**description: ** A link to the bot's avatar.", false)
            .addField(" **usage: ** --info",
                "**description: ** Information about the bot.", false)
            .addField(" **usage: ** --botid",
                "**description: ** The bot's ID.", false)
            .addField(" **usage: ** --guilds",
                "**description: ** The guilds the bot is in.", false)
            .addField(" **usage: ** --a",
                "**description: ** An announcement command", false)
            .addField(" **usage: ** --log",
                "**description: ** Testing", false)
            .addBlankField(true)

        .addField("   ``Administrators Only``",
                " **__Only Administrators can use these commands __**", false)
            .addField("**usage:** --purge",
                "**description: ** Deletes a number of messages from 2 to 100 ", false)
            .addField("**usage: ** --kick @user [reason]",
                "**description:** Kicks a guild member. Can be made with or without a reason.", false)
            .addField("**usage:** --ban @user [reason]",
                "**description:** Bans a guild member. Can be made with or without a reason.", false)
            //no need semi colin ^^^^
        message.author.send({ embed }).then(message.reply("Check your dm's"));
    }
});
//.catch(() => {
//  message.channel.user("access Denied");

client.on("message", message => {
    //const announcement = message.content
    if (message.content.startsWith(prefix + "a")) {
        const embed2 = new Discord.RichEmbed()
            .setColor(2003434)
            .setTimestamp()
            .addField("New Announcement by " + (message.author.username), "Announced" + (message.content));

        const embed3 = new Discord.RichEmbed()
            .setColor(3007004)
            .setFooter(" Your name is -- " + (message.author.username) + ("Your Discriminator is ") + (" -- ") + (message.author.tag))
            .setTimestamp()
            .addField("xd   announcement by", (message.author.tag));


        message.author.send({ embed: embed2 });
        message.author.send({ embed: embed3 });
    }
});













client.on("message", message => {
    if (message.content.startsWith(prefix + "info")) {
        const embed4 = new Discord.RichEmbed()
            .setTitle(":information_source: Information ")
            .setTimestamp()
            .setColor(3007004)
            .addField("About the bot",
                "CA is a bot scripted in javascript , made by Deni#0274.", false)
            .addField(":spy: Owner",
                `Deni#0274`, true)
            .addField(":shield: Version",
                "3.0", true)
            .addField(":books: Library",
                "Discord.js", true)
            .addField(":desktop: Guilds",
                `${message.client.guilds.size}`, true)
            .addField(":busts_in_silhouette: Members in the guild",
                `${message.guild.memberCount}`, true)
            .addField(":smile:  Users of the bot",
                `${message.client.users.size}`)
            .addField(":book: Invite the bot",
                "https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=35675317829500928", true)
            .addField(":mailbox_with_mail: Support Sever",
                "https://discord.gg/rwmQvQ5", true)
        message.channel.send({ embed: embed4 });
    }
});






client.on("message", message => {
    if (message.content === (prefix + "r")) {
        // This command must be limited to mods and admins. In this example we just hardcode the role names.
        // Please read on Array.some() to understand this bit:
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        if (!message.member.roles.some(r => ["Administrators", "Moderators", "Creator"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        // Let's first check if we have a member and if we can kick them!
        // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

        // slice(1) removes the first part, which here should be the user mention!
        const args = message.content.split(" ");
        let reason = args.slice(1).join(" ");
        if (!reason)
            return message.reply("Please indicate a reason for the kick!");

        // Now, time for a swift kick in the nuts!
        member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }

});

client.on("message", message => {
    if (message.content === (prefix + "ban")) {
        // Most of this command is identical to kick, except that here we'll only let admins do it.
        // In the real world mods could ban too, but this is just an example, right? ;)
        if (!message.member.roles.some(r => ["Administrators", "Creator"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
        const args = message.content.split(" ");
        let reason = args.slice(1).join(" ");
        if (!reason)
            return message.reply("Please indicate a reason for the ban!");

        member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }

});




client.on("message", message => {
    if (message.content === (prefix + "/announce")) {
        //let modRole = message.guild.roles.find("name", "Moderators");
        let ownerRole = message.guild.roles.find("name", "Creator");
        const args = message.content.split(" ");
        //if(message.member.roles.has(modRole.id))
        if (message.member.roles.has(ownerRole.id)) {
            let announcement = args.join(" ");
            const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField(`New Announcement by ${message.author.username}`, `${announcement}`);
            client.channels.find("name", "bot_testing_room_2").send(embed);
            message.channel.send(`:ok_hand: Annoucement sent to #bot_testing_room_2`);
        } else {
            message.channel.send("**Error:** \n You dont have permission 'Moderators' to announce");
        }
    }
});



//gives you the owner
//if owner.user.id //you want the id do
//if(owner === event.message.author.id)
//{
// step 5
//}
//else
//{
// send a m,essage to the channel and say that you're not allowed to do it
//}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


//client.on("message", message => {
//if(message.content.startsWith(prefix + "fun")) {
//message.author.send(message.author.id);
//} else {
//message.channel.send(owner.user.id);
//}


//});




//  {
//if(message.author.id === (own))
//  console.log("message author id is the same as the owner id");
//}
//}

//}}
//owner.user.id



//console.log("owner name"); {

//}// stuff


















client.login(process.env.config.token);
