const request = require('supertest');
const Games = require('../../../models/games');
const server = require('../../../api/server');

describe('/api/games', () => {
  afterAll(async () => {
    await Games.clear();
  });

  describe('GET /', () => {
    it('should return all games', async () => {
      await Games.add({
        title: 'Super Smash Bros. Brawl',
        genre: 'Video Game',
        releaseYear: 2008
      });

      const res = await request(server).get('/api/games');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body.find(t => t.releaseYear === 2008)).toBeDefined();
    });
  });

  describe('GET /:id', () => {
    it('should return a game if it can be found', async () => {
      const [game] = await Games.findBy({ title: 'Super Smash Bros. Brawl' });
      const res = await request(server).get(`/api/games/${game.id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('genre', game.genre);
    });

    it('should return 404 if a game could not be found', async () => {
      const res = await request(server).get('/api/games/2');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 422 if game payload fails validation', async () => {
      const mysteryGame = { releaseYear: 2010 };
      const res = await request(server).post('/api/games').send(mysteryGame);

      expect(res.status).toBe(422);
    });

    it('should add the game if it is successfully validated', async () => {
      const superCoolGame = {
        title: 'Dragon Quest Monsters: Joker',
        genre: 'Video Game',
        releaseYear: 2006
      };

      await request(server).post('/api/games').send(superCoolGame);
      const [game] = await Games.findBy({ title: 'Dragon Quest Monsters: Joker' });

      expect(game).toBeDefined();
      expect(game).toMatchObject(superCoolGame);
    });
  });

  describe('PUT /:id', () => {
    it('should return 422 if game payload fails validation', async () => {
      const mysteryGame = { releaseYear: 2010 };
      const res = await request(server).put('/api/games/2').send(mysteryGame);

      expect(res.status).toBe(422);
    });

    it('should return 404 if game could be found', async () => {
      const superCoolGame = {
        title: 'RuneScape',
        genre: 'Online Game',
        releaseYear: 2001
      };

      const res = await request(server).put('/api/games/3').send(superCoolGame);

      expect(res.status).toBe(404);
    });

    it('should update the game if found', async () => {
      const superCoolGame = {
        title: 'RuneScape 3',
        genre: 'Online Game',
        releaseYear: 2013
      };

      await request(server).put('/api/games/2').send(superCoolGame);

      const [mixedGame] = await Games.findById(2);

      expect(mixedGame).toHaveProperty('genre', 'Online Game');
    });
  });

  describe('DELETE /:id', () => {
    it('should return 404 if game could not be found', async () => {
      const res = await request(server).delete('/api/games/3');
      expect(res.status).toBe(404);
    });

    it('should delete the game if found', async () => {
      const res = await request(server).delete('/api/games/2');
      expect(res.status).toBe(204);
    });
  });
});
