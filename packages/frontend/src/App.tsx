import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import ChatItem from "@mernt-chat-app/shared";

axios.defaults.baseURL = "http://localhost:3001";
const fetchChatItems = async () => {
  const response = await axios.get<ChatItem>("/chats");
  return response.data;
};


function App() {
  const [chatItem, setChatItem] = useState<ChatItem | undefined>();

  useEffect(() => {
    fetchChatItems().then(setChatItem);
  }, []);


  return (
    <div>
      <div className='container--chatItem'>
        <p>{chatItem ? chatItem.text : "No messages sent..."}</p>
      </div>
    </div>
  );
}

export default App;
