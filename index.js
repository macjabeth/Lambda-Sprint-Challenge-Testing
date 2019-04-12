const debug = require('debug')('server');

const server = require('./api/server');

const port = process.env.PORT || 3000;

server.listen(port, () => {
  debug('Listening on port %d in %s mode.', port, server.settings.env);
});
