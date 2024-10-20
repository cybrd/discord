import express from "express";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";
import { config } from "dotenv";
config();

const app = express();

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.USERID || ""),
  (req, res) => {
    const { type, data } = req.body;

    if (type === InteractionType.PING) {
      res.send({ type: InteractionResponseType.PONG });
      return;
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      if (name === "test") {
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `hello world`,
          },
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
