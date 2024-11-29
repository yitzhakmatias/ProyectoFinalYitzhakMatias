// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('A token is required');

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

module.exports = { verifyToken };
