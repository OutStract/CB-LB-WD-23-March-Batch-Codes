const express = require('express');
const authRoutes = express.Router();
const { register, login, logout, getProfile } = require('../controllers/authController'); // { register: register() }
const authenticate = require('../middlewares/authenticate');


// User Registration Route
authRoutes.post('/register', register );

// User Login Route
authRoutes.post('/login', login);

// User Logout Route
authRoutes.post('/logout', authenticate, logout);

// User Profile Route
authRoutes.get('/me', authenticate, getProfile);

module.exports = authRoutes;