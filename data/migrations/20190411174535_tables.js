exports.up = function(knex) {
  return knex.schema.createTable('games', table => {
    table.increments();
    table.string('title', 50).notNullable();
    table.string('genre', 35).notNullable();
    table.integer('releaseYear').unsigned();
    table.timestamp('date_added').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
