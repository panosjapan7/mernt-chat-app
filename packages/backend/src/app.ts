import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ChatItem from "@mernt-chat-app/shared";
import { setupMongoDb, loadAllChatItems, saveChatItem } from "./db";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(json()); // middleware Express function that parses incoming JSON requests and puts the parsed data in req.body.

const PORT: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl:string = process.env.MONGODB_URL || "mongodb://localhost:27017";

// const CHAT_ITEMS:ChatItem[] = [{_id: "123", text: "My first message! (via backend)", timeStamp: new Date(), author: "Panos"}];

app.get("/chats", async (req: Request, res: Response<ChatItem[]>) => {
    const chatItems = await loadAllChatItems();
    console.log("All chat items: ", chatItems);
    res.send(chatItems);
});

app.post("/chats", async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    const chatItem = req.body;
    const saved = await saveChatItem(chatItem);
    console.log("Saves Chat Item: ", chatItem);
    // CHAT_ITEMS.push(chatItem);
    const chatItems = await loadAllChatItems();
    console.log("All Chat Items: ", chatItems);
    res.send(chatItems);
});

app.listen(PORT, async function() {
    await setupMongoDb(mongoUrl);
    console.log(`App is listening on ${PORT}`);
});


