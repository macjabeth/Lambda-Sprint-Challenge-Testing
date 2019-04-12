const Joi = require('joi');
const db = require('../data/db');

module.exports = {
  add: game => db('games').insert(game),
  find: () => db('games').select(),
  findBy: filter => db('games').where(filter),
  findById: id => db('games').where({ id }),
  update: (id, changes) => db('games').where({ id }).update(changes),
  remove: (id) => db('games').where({ id }).del(),
  clear: () => db('games').truncate(),
  schema: game => {
    const schema = Joi.object().keys({
      title: Joi.string().max(50).required(),
      genre: Joi.string().max(35).required(),
      releaseYear: Joi.number()
    });

    return Joi.validate(game, schema);
  }
};
