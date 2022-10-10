import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import ChatItem from "@mernt-chat-app/shared";

const app: Application = express();

app.use(cors());
app.use(json()); // middleware Express function that parses incoming JSON requests and puts the parsed data in req.body.

const PORT: number = parseInt(process.env.SERVER_PORT || "3001");

app.get("/chats", (req: Request, res: Response<ChatItem>) => {
    res.send({_id: "123", text: "My first message!", timeStamp: new Date(), author: "Panos"});
});

app.listen(PORT, function() {
    console.log(`App is listening on ${PORT}`);
});


