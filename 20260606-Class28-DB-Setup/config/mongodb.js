const mongoose = require('mongoose');

async function connectMongoDB() {
    const uri = 'mongodb://localhost:27017/books_db';
    await mongoose.connect(uri);
    console.log('✔️✔️ MongoDB: Connected to books_db');
}

module.exports = { connectMongoDB };