const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        author: {type: String, required: true, trim: true},
        genre: {type: String, trim: true},
        year: {type: Number, min: 1800, max: new Date().getFullYear()},
        reviews: [
            {
                reviewer: {type: String, trim: true},
                comment: {type: String, trim: true},
                rating: {type: Number, min: 1, max: 5}
            }
        ]
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Book', bookSchema);