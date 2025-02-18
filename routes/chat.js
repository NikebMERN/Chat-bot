const express = require('express');
const db = require('../db/connection');
const { getBotResponse } = require('../utils/openaiClient');
const router = express.Router();

// POST route to send messages
router.post('/messages', async (req, res) => {
    const { user_message } = req.body;
    
    if (!user_message) {
        return res.status(400).json({ error: 'User message is required.' });
    }

    try {
        // Get the bot's response from OpenAI
        const bot_message = await getBotResponse(user_message);

        // Save the messages to the database
        const query = 'INSERT INTO messages (user_message, bot_message) VALUES (?, ?)';
        db.query(query, [user_message, bot_message], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                return res.status(500).json({ error: 'Failed to save message.' });
            }
            res.status(201).json({
                message: 'Message saved successfully.',
                id: result.insertId,
                user_message,
                bot_message,
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response from OpenAI.' });
    }
});

// GET route to fetch all messages
router.get('/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY created_at ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ error: 'Failed to fetch messages.' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
