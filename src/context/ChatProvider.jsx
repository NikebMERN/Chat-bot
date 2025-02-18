import React, { createContext, useState } from 'react';

// Create ChatContext
export const ChatContext = createContext();

// Provide the Context
export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    );
};
