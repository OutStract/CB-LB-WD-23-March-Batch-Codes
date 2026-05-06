const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function writeAll (fileName, data) {
    const filePath = path.join(dataDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); // data/notes.json   data/Notes.json
}

function readAll (fileName) {
    const filePath = path.join(dataDir, fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function listNotes() {
    return fs.readdirSync(dataDir).filter(file => file.endsWith('.json')).map(file => file.replace('.json', ''));
}

function deleteNote (fileName) {
    const filePath = path.join(dataDir, fileName);
    fs.unlinkSync(filePath);
}

module.exports = {
    writeAll,
    readAll,
    listNotes,
    deleteNote
};