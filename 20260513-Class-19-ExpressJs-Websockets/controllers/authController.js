// bcryptjs is a library that generates forward only hash.
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config');
const { writeAll, readAll } = require('../utils/file');

function register (req, res) {
    const {name, email, password } = req.body;

    // 1. validate the user input
    if (!name || !email || !password) {
        return res.status(400).json({message: 'missing required fields'});
    }

    // 2. check if user already exists or not.
    const users = readAll('users.json');
    if (!users) users = [];

    const existing = users.find(user => user.email === email);
    if (existing) {
        return res.status(409).json({message: 'User with this email already exists. Please go to Login.'});
    }

    // 3. hash the password.
    const hashedPassword = bcryptjs.hashSync(password, 10); // 10 is the salt rounds. It determines how many times the hashing process is applied. Higher rounds means more security but also more time to hash.

    // 4. create a new user and save it to the file.
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    // 5. write the updated users array back to the file.
    writeAll('users.json', users);

    // 6. send a response back to the client.
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            name, email
        }
    });
}

function login (req, res) {
    
    const {email, password} = req.body;

    // 1. validate the user input
    if (!email || !password) {
        return res.status(400).json({message: 'missing required fields'});
    }

    // 2. check if user exists or not.
    const users = readAll('users.json');
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({message: 'User not found. Please register first.'});
    }

    // 3. compare the password with the hashed password.
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid credentials. Please try again.'});
    }

    const userData = {
        id: user.id,
        email: user.email,
        name: user.name
    };

    // 4. generate a JWT token.
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
        httpOnly: true, // This makes the cookie inaccessible to JavaScript on the client side, providing protection against XSS attacks.
        maxAge: 3600000, // 1 hour in milliseconds. This sets the expiration time for the cookie.
        sameSite: 'strict' // This prevents the browser from sending the cookie along with cross-site requests, providing protection against CSRF attacks.
    });

    // 5. send a response back to the client.
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            name: user.name,
            email: user.email,
            username: user.name
        }
    });
}

function logout (req, res) {
    res.clearCookie('token');
    res.status(200).json({message: 'User logged out successfully'});
}

function getProfile (req, res) {
    const user = req.user; // This is set by the authMiddleware after verifying the JWT token.
    res.status(200).json({ user });
}

module.exports = {
    register,
    login,
    logout,
    getProfile
}

/*
2xx : OK, Success, ....
3xx : Redirection,
4xx : Client Error,
5xx : Server Error
*/ 