const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'books_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initMariaDB() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(100),
        year INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await pool.execute(createTableQuery);
    console.log('✔️✔️ MariaDB: Books table is ready');
}

module.exports = { pool, initMariaDB };