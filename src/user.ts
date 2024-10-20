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
  console.log(message);
});

client.login(process.env.USERTOKEN);
