import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (userMessage) => {
    try {
        const response = await axios.post(`${API_URL}/messages`, { user_message: userMessage });
        return response.data;
    } catch (error) {
        console.error('Error while sending message:', error);
        throw error;
    }
};

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/messages`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
