const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');

const KEY = process.env.JWT_SECRET;

function createJSONToken(userId, email) {
    if (!KEY) {
        console.error('JWT_SECRET is undefined.');
        throw new Error('Missing JWT_SECRET in environment variables.');
    }
    return sign({ userId, email }, KEY, { expiresIn: '6h' });
}


function validateJSONToken(token) {
    return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING.');
        return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
        req.userId = validatedToken.userId;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;