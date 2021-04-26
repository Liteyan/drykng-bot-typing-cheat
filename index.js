const Discord = require("discord.js");
const client = new Discord.Client();
const token = "Your.Bot.Token";

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.author.id !== "BotID") return;
    const odaiEmbed = newMessage.embeds[0];
    if (odaiEmbed.author.name === "タイピングゲーム" && odaiEmbed.description.includes("以内に送信してください。１語一句間違えてはいけません。スペースは入力しないでください。")) {
        const odai = odaiEmbed.description.split("\n")[2].replace(/ /g, "");
        newMessage.react("📤");
        const filter = (reaction, user) => reaction.emoji.name === "📤" && !user.bot;
        newMessage.awaitReactions(filter, { max: 1, time: 5000, errors: ["time"] })
            .then(() => newMessage.channel.send(odai)).then(() => newMessage.reactions.removeAll())
            .catch(() => newMessage.reactions.removeAll());
    }
});

client.login(token);
