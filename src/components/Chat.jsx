import React, { useContext, useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import "../assets/CSS/Chat.css";
import { ChatContext } from "../context/ChatProvider";

const Chat = () => {
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { selectedChat } = useContext(ChatContext);

    useEffect(() => {
        if (selectedChat) {
            setMessages([
                { user: selectedChat.user_message, bot: selectedChat.bot_message },
            ]);
        }
    }, [selectedChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/messages`,
                { user_message: userMessage }
            );
            const botMessage = response.data.bot_message;

            setMessages([...messages, { user: userMessage, bot: botMessage }]);
            setUserMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleEdit = async (updatedMessage) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/messages`,
                { user_message: updatedMessage }
            );
            const botMessage = response.data.bot_message;

            setMessages([...messages, { user: null, bot: botMessage }]);
            setUserMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
        // const updatedMessages = [...messages];
        // updatedMessages[index].userMessage = updatedMessage;
    
        //? Regenerate the bot's response (simulated or fetched from API)
        // updatedMessages[index].botMessage = `Updated response to: "${updatedMessage}"`;
    
        // setMessages(updatedMessages);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="header">
                    <h3>NIKOGPT</h3>
                </div>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <Message
                            onEdit={(newMessage) => handleEdit(newMessage)}
                            key={index}
                            userMessage={msg.user}
                            botMessage={msg.bot}
                        />
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type a message"
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
