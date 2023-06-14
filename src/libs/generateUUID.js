const uuid = require('uuid');

const generateUUID = () => uuid.v4().replace(/-/gi, '');

module.exports = { generateUUID };