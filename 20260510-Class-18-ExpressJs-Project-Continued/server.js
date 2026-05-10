const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const app = express();

app.use(cors({
  origin: 'https://hoppscotch.io'
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // throw new Error('Test Error'); // This will trigger the global error handler
  next();
})

// Routes
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const { register } = require('./controllers/authController');

// Create Notes Route
app.use('/notes', notesRoutes); // localhost:3001/notes/create-note.

// Auth Routes
app.use('/auth', authRoutes); // localhost:3001/auth/register, localhost:3001/auth/login

app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Notes API',
      endpoints: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        createNote: 'POST /notes/create-note',
        listNotes: 'GET /notes/list-notes',
        readNote: 'GET /notes/read-note/:name',
        updateNote: 'PUT /notes/update-note/:name',
        deleteNote: 'DELETE /notes/delete-note/:name'
      }
    });
});

// Default 404 handling
app.use((req, res) => {
    res.status(404).json({message: 'Route not found'});
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({message: 'Internal Server Error'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`\n🚀 Test Accounts: `);
    console.log(`Email: p.thakur@gmail.com`);
    console.log(`Password: password`);
});