const express = require('express');

const jsonParser = express.json({
  limit: '10mb',
  strict: true,
  type: 'application/json',
});

module.exports = jsonParser;
