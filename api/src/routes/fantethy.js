import express from 'express';
import { getPlayersOnTeam, addPlayersToTeam } from '../services/fantethy';

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('WORKING');
  const users = [
    0x627306090abab3a6e1400e9345bc60c78a8bef57,
    0xf17f52151ebef6c7334fad080c5704d77216b732,
    0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef,
    0x821aea9a577a9b44299b9c15c88cf3087f3b5544,
  ];
  try {
    const totalList = [];
    for (let i = 0; i < 4; i++) {
      const players = await getPlayersOnTeam(users[i]);
      totalList.push(players);
    }
    res.status(200).send(totalList);
  } catch (e) {
    next(e);
  }
});

router.get('/:user', async (req, res, next) => {
  const { user } = req.params;
  try {
    const players = await getPlayersOnTeam(user);
    res.status(200).send(players);
  } catch (e) {
    next(e);
  }
});

router.post('/:user', async (req, res, next) => {
  const { user } = req.params;
  const { player } = req.body;
  try {
    const players = await addPlayersToTeam(user, player);
    res.status(200).send(players);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
