const { pipeline } = require('stream/promises');
const fs = require('fs');

const pipeStreams = async (source, destination) => {
  await pipeline(source, destination);
};

const createReadStream = (path) => fs.createReadStream(path);
const createWriteStream = (path) => fs.createWriteStream(path);

module.exports = { pipeStreams, createReadStream, createWriteStream };
