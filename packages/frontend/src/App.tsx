import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import ChatItem from "@mernt-chat-app/shared";

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001";

const fetchChatItems = async ():Promise<ChatItem[]> => {
  const response = await axios.get<ChatItem[]>("/chats");
  return response.data;
};


function App() {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [chatItemText, setChatItemText] = useState<string>("");

  const createChatItem = async (chatItemText: string): Promise<void> => {
    const chatItem: ChatItem = {
      text: chatItemText, 
      timeStamp: new Date(),
      author: "Panos",
      // _id: "123"
    };
    try {
      const response = await axios.post<ChatItem[]>("/chats", chatItem);
      setChatItems(response.data);
    } 
    catch (error) {
      setChatItems([]);
      setError("Something went wrong when fetching array with messages...");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatItems()
        .then(setChatItems)
        .catch((error) => {
          setChatItems([]);
          setError("Something went wrong when fetching array with messages...");
        });
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <div className='container--chatItem'>
        {chatItems && chatItems.length !== 0 ? chatItems.map( chatItem => (
                        <div key={chatItem._id}>
                          <p>{chatItem.text}</p>
                        </div>
        )
          ) : error ? error : "No messages sent..."}
      </div>

      <section>
        <input type="text" value={chatItemText} onChange={(e) => setChatItemText(e.target.value)}/>
        <button onClick={(e) => createChatItem(chatItemText)}>Send</button>
      </section>
    </div>
  );
}

export default App;
