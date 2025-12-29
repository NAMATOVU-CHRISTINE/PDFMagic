const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);
};

const retry = async (fn, attempts = 3, delayMs = 1000) => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await delay(delayMs);
    }
  }
};

module.exports = { delay, timeout, retry };
