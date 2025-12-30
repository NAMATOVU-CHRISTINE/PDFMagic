const securityConfig = {
  bcryptRounds: 10,
  jwtExpiresIn: '7d',
  sessionMaxAge: 7 * 24 * 60 * 60 * 1000,
  csrfProtection: true,
  rateLimitEnabled: true,
};

module.exports = securityConfig;
