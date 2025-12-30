const { pipeline } = require('stream/promises');
const { Readable, Writable } = require('stream');

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

const bufferToStream = (buffer) => Readable.from(buffer);

module.exports = { pipeline, streamToBuffer, bufferToStream };
