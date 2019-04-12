const validate = require('../middleware/validate');
const Games = require('../models/games');
const router = require('express').Router();

// C
router.post('/', validate(Games.schema), async ({ body: newGame }, res) => {
  const [id] = await Games.add(newGame);
  const [game] = await Games.findById(id);
  res.status(201).json(game);
});

// R
router.get('/', async (req, res) => {
  const turds = await Games.find();
  res.status(200).json(turds);
});

router.get('/:id', async ({ params: { id } }, res) => {
  const [game] = await Games.findById(id);
  Boolean(game)
    ? res.status(200).json(game)
    : res.status(404).json({ message: 'The game could not be found.' });
});

// U
router.put(
  '/:id',
  validate(Games.schema),
  async ({ params: { id }, body: changes }, res) => {
    const count = await Games.update(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ message: 'The game could not be updated, sorry.' });
  }
);

// D
router.delete('/:id', async ({ params: { id } }, res) => {
  const count = await Games.remove(id);
  Boolean(count)
    ? res.status(204).end()
    : res.status(404).json({ message: 'The game could not be removed, sorry.' });
});

module.exports = router;
