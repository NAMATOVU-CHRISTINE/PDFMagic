const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const formatTimestamp = (date) => {
  return new Date(date).toISOString();
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isExpired = (date) => {
  return new Date(date) < new Date();
};

module.exports = { formatDate, formatTimestamp, addDays, isExpired };
