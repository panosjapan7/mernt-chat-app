import { connect, model, Schema } from "mongoose";
import ChatItem from "@mernt-chat-app/shared";

const ChatItemSchema = new Schema({
    text: String,
    timeStamp: Date
});

const ChatItemModel = model<ChatItem>("ChatItem", ChatItemSchema);