const express = require('express');
const notesRoutes = express.Router();
const authenticate = require('../middlewares/authenticate');
const { createNote, readNote, listAllNotes, deleteGivenNote } = require('../controllers/notesController');

// Create Note Route
notesRoutes.post('/create-note', authenticate, createNote);

// List Notes Route
notesRoutes.get('/list-notes', authenticate, listAllNotes);

// Read Note Route
notesRoutes.get('/read-note/:name', authenticate, readNote);


// Update Note Route
notesRoutes.put('/update-note/:name', authenticate,createNote);

// Delete Note Route
notesRoutes.delete('/delete-note/:name', authenticate, deleteGivenNote);

module.exports = notesRoutes;