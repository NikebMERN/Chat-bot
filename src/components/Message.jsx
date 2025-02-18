import React, { useState } from "react";
// import { Edit } from "@mui/icons-material";
import "../assets/CSS/Message.css";

const Message = ({ userMessage, botMessage, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(userMessage);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setEditedMessage(e.target.value);
    };

    const handleSave = () => {
        if (editedMessage.trim() && editedMessage !== userMessage) {
            onEdit(editedMessage); // Pass the updated userMessage to the parent
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedMessage(userMessage); // Revert to original message
    };

    const isCodeMessage = (message) => {
        // Simple check for code-like content (e.g., containing backticks or indentation)
        return message && (message.includes("```") || message.includes("\n"));
    };

    return (
        <div className="message">
            <div className="user-message">
                <div className="message-container">
                    {isEditing ? (
                        <div className="message-edit-container">
                            <textarea
                                type="text"
                                value={editedMessage}
                                onChange={handleInputChange}
                                className="edit-input"
                                placeholder="Edit your message"
                            />
                            <div className="edit-buttons">
                                <button onClick={handleSave} className="save-button">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {userMessage === null ? null : (
                                <>
                                    <div className="message-bubble user-bubble">
                                        {userMessage}
                                    </div>
                                    <span className="edit-icon" onClick={handleEditClick}>
                                        ✏️
                                    </span>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="bot-message">
                <div
                    className={`message-bubble bot-bubble ${
                        isCodeMessage(botMessage) ? "bot-code" : ""
                    }`}
                >
                    {isCodeMessage(botMessage) ? (
                        <pre>{botMessage}</pre>
                    ) : (
                        botMessage
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
