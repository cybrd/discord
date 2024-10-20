import {
  CommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { config } from "dotenv";
config();

const rest = new REST().setToken(process.env.TOKEN || "");

rest
  .put(
    Routes.applicationGuildCommands(
      "1297160655413182524",
      "162814851092054016"
    ),
    {
      body: [
        {
          name: "list-online",
          description: "list-online test",
          data: new SlashCommandBuilder()
            .setName("list-online")
            .setDescription("list-online!"),
        },
      ],
    }
  )
  .then(console.log)
  .catch(console.error);