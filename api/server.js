require('express-async-errors');

const server = require('express')();

require('../routes')(server);

module.exports = server;
