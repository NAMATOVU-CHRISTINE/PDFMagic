const toBase64 = (buffer) => buffer.toString('base64');

const fromBase64 = (str) => Buffer.from(str, 'base64');

const concat = (...buffers) => Buffer.concat(buffers);

const compare = (buf1, buf2) => Buffer.compare(buf1, buf2) === 0;

module.exports = { toBase64, fromBase64, concat, compare };
