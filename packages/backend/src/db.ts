import { connect, model, Schema } from "mongoose";
import ChatItem from "@mernt-chat-app/shared";

const ChatItemSchema = new Schema({
    text: String,
    timeStamp: Date,
    author: String
});

const ChatItemModel = model<ChatItem>("ChatItem", ChatItemSchema);

export const setupMongoDb = async (url: string) => {
    await connect(url);
};

export const loadAllChatItems = async (): Promise<ChatItem[]> => {
    return ChatItemModel.find({}).exec()
};

export const saveChatItem = async (chatItem: ChatItem): Promise<void> => {
    const newModel = new ChatItemModel(chatItem);
    newModel.save();
};

