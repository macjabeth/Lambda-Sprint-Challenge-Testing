exports.seed = function(knex) {
  return knex('games').insert([
    {
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    },
    {
      title: 'Spyro',
      genre: 'Video Game',
      releaseYear: 1998
    },
    {
      title: 'Metal Gear',
      genre: 'Video Game',
      releaseYear: 1998
    },
    {
      title: 'Valkyrie Profile: Silmeria',
      genre: 'Video Game',
      releaseYear: 2006
    },
    {
      title: 'Oblivion',
      genre: 'Video Game',
      releaseYear: 2006
    },
    {
      title: 'Call of Duty: Modern Warfare 2',
      genre: 'Video Game',
      releaseYear: 2009
    },
    {
      title: 'Skyrim',
      genre: 'Video Game',
      releaseYear: 2011
    }
  ]);
};
