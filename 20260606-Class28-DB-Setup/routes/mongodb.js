const express = require("express");
const router  = express.Router();
const Book    = require("../models/Book");

// ── GET /nosql/books  →  list all books ──────────────────────────────────────
router.get("/books", async (req, res) => {
  try {
    // .find({}) = no filter → returns everything
    // .sort({ createdAt: -1 }) = newest first
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.json({ source: "MongoDB", count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /nosql/books/:id  →  single book ─────────────────────────────────────
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ source: "MongoDB", data: book });
  } catch (err) {
    // findById throws CastError for malformed ObjectIds
    res.status(400).json({ error: err.message });
  }
});

// ── POST /nosql/books  →  create a book ──────────────────────────────────────
router.post("/books", async (req, res) => {
  try {
    // new Model(data) + .save() runs Mongoose validation from the Schema
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json({ source: "MongoDB", insertedId: saved._id, data: saved });
  } catch (err) {
    // Mongoose validation errors have err.name === "ValidationError"
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /nosql/books/:id  →  update a book ───────────────────────────────────
router.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:            true,  // return the updated doc, not the original
        runValidators:  true,  // re-run Schema validators on update
      }
    );
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ source: "MongoDB", message: "Book updated", data: book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /nosql/books/:id  →  delete a book ────────────────────────────────
router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ source: "MongoDB", message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── POST /nosql/books/:id/reviews  →  add a review (embedded sub-doc) ────────
//  Teaching point: in MongoDB you can push data INTO a document without
//  a separate table or a JOIN — just update the array field.
router.post("/books/:id/reviews", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: req.body } }, // $push appends to the reviews array
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(201).json({ source: "MongoDB", message: "Review added", data: book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── GET /nosql/search?title=xyz&genre=xyz  →  search ─────────────────────────
router.get("/search", async (req, res) => {
  const filter = {};
  if (req.query.title)  filter.title  = { $regex: req.query.title,  $options: "i" };
  if (req.query.author) filter.author = { $regex: req.query.author, $options: "i" };
  if (req.query.genre)  filter.genre  = { $regex: req.query.genre,  $options: "i" };

  try {
    const books = await Book.find(filter);
    res.json({ source: "MongoDB", count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;