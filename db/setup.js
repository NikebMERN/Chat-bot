const mysql = require('mysql2');
require('dotenv').config();

// Create database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Create database and table
const setupDatabase = () => {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`;
    const useDatabaseQuery = `USE ${process.env.DB_NAME};`;
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_message TEXT NOT NULL,
            bot_message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(createDatabaseQuery, (err) => {
        if (err) {
            console.error('Error creating database:', err.message);
            return;
        }
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);

        db.query(useDatabaseQuery, (err) => {
            if (err) {
                console.error('Error selecting database:', err.message);
                return;
            }

            db.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                    return;
                }
                console.log('Table "messages" created or already exists.');
                db.end(); // Close the database connection
            });
        });
    });
};

// Run setup
// setupDatabase();

module.exports = { setupDatabase }