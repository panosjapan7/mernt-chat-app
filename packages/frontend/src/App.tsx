import React, { useState, useEffect } from 'react';
import axios from "axios";
import './styles/App.css';
import ChatItem from "@mernt-chat-app/shared";
import { LoginInput } from "./LoginInput";

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001";

const fetchChatItems = async ():Promise<ChatItem[]> => {
  const response = await axios.get<ChatItem[]>("/chats");
  return response.data;
};


function App() {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [chatItemText, setChatItemText] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const formatDate = (date:string) => {
    const formattedDate = date.split("T")[0];
    const formattedHour = date.split("T")[1].substring(0, 2);
    const formattedMinutes = date.split("T")[1].substring(3, 5);
    const amPM = parseInt(formattedHour) < 12 ? "AM" : "PM";
    let t = new Date();
    let today = t.toString().split(" ")[2];
    return `${formattedDate.split("-")[2] === today ? "Today" : formattedDate} at ${formattedHour}:${formattedMinutes} ${amPM}`;
  };

  const createChatItem = async (chatItemText: string): Promise<void> => {
    const chatItem: ChatItem = {
      text: chatItemText, 
      timeStamp: new Date(),
      author: author,
    };
    try {
      const response = await axios.post<ChatItem[]>("/chats", chatItem);
      setChatItems(response.data);
      setChatItemText("");
    } 
    catch (error) {
      setChatItems([]);
      setError("Something went wrong when fetching array with messages...");
    }
  };

  const performLogin = async (author: string): Promise<void> => {
    setAuthor(author);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatItems()
        .then(setChatItems)
        .catch((error) => {
          setChatItems([]);
          setError("Something went wrong when fetching array with messages...");
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container--page'>
      {!author && <LoginInput onLogin={performLogin} />}
      
      {author && (  
        <div className='container--chatItems-input'>
          <div className='container--chatItems'>

            <div className='container--chatItem'>
              {chatItems && chatItems.length !== 0 ? chatItems.map( chatItem => (
                              <div className={`container--chat-item${chatItem.author === author ? "-author" : "-users"}`} key={chatItem._id}>
                                <div className='container--author-timestamp'>
                                  <p className='author'>{chatItem.author}</p>
                                  <p className='timestamp'>{formatDate(chatItem.timeStamp.toLocaleString())}</p>
                                </div>
                                <p>{chatItem.text}</p>
                              </div>
              )
                ) : error ? error : "No messages sent..."}
            </div>

          </div>

          <section className='container--input'>
            <p>Author: {author}</p>
            <input type="text" value={chatItemText} onChange={(e) => setChatItemText(e.target.value)}/>
            <button onClick={(e) => createChatItem(chatItemText)}>Send</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
