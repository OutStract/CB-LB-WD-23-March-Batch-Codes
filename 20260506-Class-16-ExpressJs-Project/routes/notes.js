const express = require('express');
const notesRoutes = express.Router();

const { createNote, readNote, listAllNotes, deleteGivenNote } = require('../controllers/notesController');

// Create Note Route
notesRoutes.post('/create-note', createNote);

// List Notes Route
notesRoutes.get('/list-notes', listAllNotes);

// Read Note Route
notesRoutes.get('/read-note/:name', readNote);


// Update Note Route
notesRoutes.put('/update-note/:name', createNote);

// Delete Note Route
notesRoutes.delete('/delete-note/:name', deleteGivenNote);

module.exports = notesRoutes;