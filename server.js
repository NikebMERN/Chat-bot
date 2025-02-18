const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Use chat routes
app.use('/api', chatRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
