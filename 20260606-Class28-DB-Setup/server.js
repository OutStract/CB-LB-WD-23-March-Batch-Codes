const express = require('express');
const cors = require('cors');
const { initMariaDB } = require('./config/mariadb');
const { connectMongoDB } = require('./config/mongodb');


// Routes
const mariadbRoutes = require('./routes/mariadb');
const mongodbRoutes = require('./routes/mongodb');


const app = express();
const port = 3000;


// Global Middlewares
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/sql', mariadbRoutes);
app.use('/mongodb', mongodbRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});


async function start () {
    try {
        await initMariaDB();
        await connectMongoDB();
        app.listen(port, () => {
            console.log(`🚀🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

start();