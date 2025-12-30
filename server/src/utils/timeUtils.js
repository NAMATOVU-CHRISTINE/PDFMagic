const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const toSeconds = (ms) => Math.floor(ms / SECOND);
const toMinutes = (ms) => Math.floor(ms / MINUTE);
const toHours = (ms) => Math.floor(ms / HOUR);
const toDays = (ms) => Math.floor(ms / DAY);

module.exports = { SECOND, MINUTE, HOUR, DAY, WEEK, toSeconds, toMinutes, toHours, toDays };
