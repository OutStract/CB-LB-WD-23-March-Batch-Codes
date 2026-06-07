const express = require('express');
const router = express.Router();
const { pool } = require('../config/mariadb');

// GET /sql/books - Get all books
router.get('/books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Books not found' });
        }
        res.json({
            source: 'MariaDB',
            count: rows.length,
            data: rows
        });
    } catch (error) { 
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// GET /sql/books/:id - Get a book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({
            source: 'MariaDB',
            count: rows.length,
            data: rows[0]
        });
    } catch (error) { 
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// POST /sql/books - Create a new book
router.post("/books", async (req, res) => {
  console.log("🔥🔥 req.body:", req.body);
  const { title, author, genre, year } = req.body;

  // Basic validation
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)",
      [title, author, genre || null, year || null]
    );
    // result.insertId is the auto-generated primary key
    res.status(201).json({ source: "MariaDB", insertedId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/books/:id", async (req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    const [result] = await pool.execute(
      "UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?",
      [title, author, genre, year, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Book not found" });
    res.json({ source: "MariaDB", message: "Book updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const [result] = await pool.execute(
      "DELETE FROM books WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Book not found" });
    res.json({ source: "MariaDB", message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { title = "", author = "" } = req.query;
  try {
    // CONCAT % around value for partial-match LIKE
    const [rows] = await pool.execute(
      "SELECT * FROM books WHERE title LIKE ? AND author LIKE ?",
      [`%${title}%`, `%${author}%`]
    );
    res.json({ source: "MariaDB", count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;