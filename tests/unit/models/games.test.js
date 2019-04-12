const Games = require('../../../models/games');

describe('games', () => {
  it('should add new games', async () => {
    await Games.add({
      title: 'Midnight Club II',
      genre: 'Video Game',
      releaseYear: 2003
    });

    await Games.add({
      title: 'Settlers of Catan',
      genre: 'Board Game',
      releaseYear: 1995
    });

    const games = await Games.find();
    expect(games).toHaveLength(2);
  });

  it('should find a game', async () => {
    const [game] = await Games.findBy({ title: 'Midnight Club II' });
    expect(game).toBeDefined();
    expect(game).toHaveProperty('releaseYear', 2003);
  });

  it('should update a game', async () => {
    const count = await Games.update(1, {
      title: 'Midnight Club III',
      genre: 'Arcade Game',
      releaseYear: 2005
    });

    expect(count).toBe(1);
  });

  it('should delete a game', async () => {
    const count = await Games.remove(1);
    expect(count).toBe(1);
  })

  it('should clear the games', async () => {
    await Games.clear();

    const games = await Games.find();

    expect(games).toHaveLength(0);
  });
});
