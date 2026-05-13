const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authenticate (req, res, next) {
    // 1. get the token from the request header.
    // const authHeader = req.headers['authorization'];
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: 'Authorization token is missing. Login again.'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // {id, email, role}
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token. Please login again.'});
    }
}

module.exports = authenticate;