const { json } = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { logger, errorLogger } = require('../middleware/winston');
const games = require('./games');

module.exports = server => {
  server.use(helmet());
  server.use(compression());
  server.use(cors());
  server.use(json());
  server.use(logger);
  server.use('/api/games', games);
  server.use(errorLogger);
};
