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
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchChatItems()
      .then(setChatItem)
      .catch((error) => {
        setChatItem(undefined);
        setError("Something went wrong when fetching messages...");
      });
  }, []);


  return (
    <div>
      <div className='container--chatItem'>
        <p>{chatItem ? chatItem.text : error ? error : "No messages sent..."}</p>
      </div>
    </div>
  );
}

export default App;
