import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import axios from "axios";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    // Fetch chats from the backend
    const fetchChats = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages`); // Replace with your backend API URL
            const chatData = response.data.map((chat, i) => ({
                name: `Chat-${i + 1}: ${chat.user_message}`, // Generate a name for the chat
                messages: chat, // Use messages from the backend
            }));
            // console.log(chatData);
            setChats(chatData);
            setFilteredChats(chatData);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    fetchChats();
}, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filterChats = (query) => {
    if (!query) {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) =>
        chat.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  };

  const addNewChat = () => {
    window.location.reload();
};


  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <Sidebar
          isDarkMode={isDarkMode}
          handleToggle={handleToggle}
          chats={filteredChats}
          filterChats={filterChats}
          addNewChat={addNewChat}
        />
      </div>
      <div className="content">
        <Chat />
      </div>
    </div>
  );
}

export default App;