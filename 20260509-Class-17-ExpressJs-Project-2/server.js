const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'https://hoppscotch.io'
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');

// Create Notes Route
app.use('/notes', notesRoutes); // localhost:3001/notes/create-note.

// Auth Routes
app.use('/auth', authRoutes); // localhost:3001/auth/register, localhost:3001/auth/login

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});