const express = require('express');
const authRoutes = express.Router();
const { register, login } = require('../controllers/authController'); // { register: register() }


// User Registration Route
authRoutes.post('/register', register );

// User Login Route
authRoutes.post('/login', login);

module.exports = authRoutes;