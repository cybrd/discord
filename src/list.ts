import {
  ChannelType,
  Client,
  Collection,
  GatewayIntentBits,
  GuildMember,
} from "discord.js";
import { config } from "dotenv";
config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("ready");
});

client.on("messageCreate", (message) => {
  if (
    message.content === "!online" &&
    ["cybrd", ".josap", "ultradash"].find((x) => x === message.author.username)
  ) {
    const voiceChannel = message.guild?.channels.cache.get(message.channelId);

    if (voiceChannel?.type === ChannelType.GuildVoice) {
      const members = voiceChannel?.members as Collection<string, GuildMember>;

      const nameList = members.map((x) => {
        return x.user.username;
      });

      message.reply(nameList.join("\n"));
    }
  }
});

client.login(process.env.TOKEN);
