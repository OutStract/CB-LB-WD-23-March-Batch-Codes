const { writeAll, readAll, listNotes, deleteNote } = require('../utils/file');

function createNote(req, res) {
    const reqBody = req.body;
    console.log('Request Body:', reqBody);
    writeAll(`notes/${reqBody.name}.json`, reqBody); // Notes.json
    res.send({
        message: 'Note created successfully',
        status: 'success',
        code: 201
    });
}

function readNote(req, res) {
    const fileName = req.params.name;
    const noteData = readAll(`notes/${fileName}.json`);
    res.send({
        message: 'Note read successfully',
        status: 'success',
        code: 200,
        data: noteData
    });
}

function listAllNotes(req, res) {
    const notesList = listNotes();
    res.send({
        message: 'Notes listed successfully',
        status: 'success',
        code: 200,
        data: notesList
    });
}

function deleteGivenNote(req, res) {
    const fileName = req.params.name;
    deleteNote(`notes/${fileName}.json`);
    res.send({
        message: 'Note deleted successfully',
        status: 'success',
        code: 200
    });
}

module.exports = {
    createNote,
    readNote,
    listAllNotes,
    deleteGivenNote
};