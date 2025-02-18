import React, { useContext, useState } from "react";
import { Switch } from "@mui/material";
import { Brightness4, Brightness7, Search, Add } from "@mui/icons-material";
import "../assets/CSS/Sidebar.css";
import { ChatContext } from "../context/ChatProvider";

function Sidebar({ isDarkMode, handleToggle, chats, filterChats, addNewChat }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { setSelectedChat } = useContext(ChatContext);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterChats(query); // Call the filter function passed as a prop
    };

    const truncateString = (str) => {
        if (str?.length > 30) {
            return str.slice(0, 30) + '...';
        } else {
            return str;
        }
    };

    const handleChatClick = (chat) => {
        setSelectedChat(chat); // Update the selected chat in context
    };

    const handleNewChat = () => {
        addNewChat(); // Add a new chat by calling the function passed as a prop
    };

    return (
        <div className={`sidebar ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="sidebar-header">
                <div className="mode-toggle">
                    <Brightness7 className="sun-icon" />
                    <Switch checked={isDarkMode} onChange={handleToggle} />
                    <Brightness4 className="moon-icon" />
                    <Add className="add-icon" onClick={handleNewChat} titleAccess="Start a new chat" />
                </div>
                <div className="search-bar">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="chat-list">
                {chats.length > 0 ? (
                    chats.map((chat, index) => (
                        <button onClick={() => handleChatClick(chat.messages)} key={index} className="chat-item">
                            {truncateString(chat.name)}
                        </button>
                    ))
                ) : (
                    <p>No chats found</p>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
