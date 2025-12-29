const express = require('express');

const urlEncodedParser = express.urlencoded({
  extended: true,
  limit: '10mb',
});

module.exports = urlEncodedParser;
