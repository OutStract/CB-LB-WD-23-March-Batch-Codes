const express = require('express');
const notesRoutes = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { createNote, readNote, listAllNotes, deleteGivenNote } = require('../controllers/notesController');

// Create Note Route
notesRoutes.post('/create-note', authenticate, authorize('instructor', 'student'), createNote);

// List Notes Route
notesRoutes.get('/list-notes', authenticate, listAllNotes);

// Read Note Route
notesRoutes.get('/read-note/:name', authenticate, readNote);


// Update Note Route
notesRoutes.put('/update-note/:name', authenticate,createNote);

// Delete Note Route
notesRoutes.delete('/delete-note/:name', authenticate, authorize('instructor', 'admin'), deleteGivenNote);

module.exports = notesRoutes;