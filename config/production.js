const localPg = {
  host: 'localhost',
  database: 'games',
  user: 'Dovahkiin',
  password: 'KriLunAus!'
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  knex: {
    client: 'pg',
    connection: productionDbConnection,
  }
};
