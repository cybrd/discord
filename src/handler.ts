import express from "express";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";
import { config } from "dotenv";
import {
  ChannelType,
  Client,
  Collection,
  GatewayIntentBits,
  GuildMember,
} from "discord.js";
config();

const app = express();

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

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.ID || ""),
  (req, res) => {
    const { type, data, channel } = req.body;

    if (type === InteractionType.PING) {
      res.send({ type: InteractionResponseType.PONG });
      return;
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      if (name === "list-online") {
        console.log("client login start");
        client.login(process.env.TOKEN).then(() => {
          console.log("client login done");

          const voiceChannel = client.channels.cache.get(channel.id);
          if (voiceChannel?.type === ChannelType.GuildVoice) {
            const members = voiceChannel?.members as Collection<
              string,
              GuildMember
            >;

            const nameList = members.map((x) => {
              return x.nickname || x.user.globalName || x.user.username;
            });

            res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: nameList.join("\n"),
              },
            });
          }
        });
        return;
      }

      console.error(`unknown command: ${name}`);
      res.status(400).json({ error: "unknown command" });
      return;
    }

    console.error("unknown interaction type", type);
    res.status(400).json({ error: "unknown interaction type" });
  }
);

app.listen(3000, () => {
  console.log("listening");
});
