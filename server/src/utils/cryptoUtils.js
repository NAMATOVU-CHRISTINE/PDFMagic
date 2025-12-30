const crypto = require('crypto');

const generateToken = (length = 32) => crypto.randomBytes(length).toString('hex');

const hashString = (str) => crypto.createHash('sha256').update(str).digest('hex');

const generateUUID = () => crypto.randomUUID();

module.exports = { generateToken, hashString, generateUUID };
