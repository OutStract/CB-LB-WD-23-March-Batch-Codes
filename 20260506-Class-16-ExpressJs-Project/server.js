const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'https://hoppscotch.io'
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
const notesRoutes = require('./routes/notes');

// Create Notes Route
app.use('/notes', notesRoutes); // localhost:3001/notes/create-note.


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});