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

app.get("/chats", async (req: Request, res: Response<ChatItem[]>) => {
    const chatItems = await loadAllChatItems();
    res.send(chatItems);
});

app.post("/chats", async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    const chatItem = req.body;
    const saved = await saveChatItem(chatItem);
    const chatItems = await loadAllChatItems();
    res.send(chatItems);
});

app.listen(PORT, async function() {
    await setupMongoDb(mongoUrl);
    console.log(`Backend server connected on port ${PORT}`);
});


