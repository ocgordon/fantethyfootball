import express from 'express';
import {
  getPlayersOnTeam,
  addPlayersToTeam,
  assignPoints,
  getPoints,
  getAllPoints,
} from '../services/fantethy';

const router = express.Router();

router.get('/players', async (req, res, next) => {
  const players = [
    {
      name: 'Eli Manning',
      id: 0,
    },
    {
      name: 'Myles Garrett',
      id: 1,
    },
    {
      name: 'Devaroe Lawrence',
      id: 2,
    },
    {
      name: 'Larry Ogunjobi',
      id: 3,
    },
    {
      name: 'Sheldon Richardson',
      id: 4,
    },
    {
      name: 'Chris Smith',
      id: 5,
    },
    {
      name: 'Chad Thomas',
      id: 6,
    },
    {
      name: 'Olivier Vernon',
      id: 7,
    },
    {
      name: 'Adarius Taylor',
      id: 8,
    },
    {
      name: 'Malik Jefferson',
      id: 9,
    },
    {
      name: 'Mack Wilson',
      id: 10,
    },
    {
      name: 'Josh Allen',
      id: 11,
    },
    {
      name: 'Matt Barkley',
      id: 12,
    },
    {
      name: 'Frank Gore',
      id: 13,
    },
    {
      name: 'Devin Singletary',
      id: 14,
    },
    {
      name: 'T.J. Yeldon',
      id: 15,
    },
    {
      name: 'Patrick DiMarco',
      id: 16,
    },
    {
      name: 'Cole Beasley',
      id: 17,
    },
    {
      name: 'John Brown',
      id: 18,
    },
    {
      name: 'Robert Foster',
      id: 19,
    },
  ];

  try {
    res.status(200).send(players);
  } catch (e) {
    next(e);
  }
});

router.get('/points', async (req, res, next) => {
  console.log('working');
  try {
    const pointResponse = await getAllPoints();
    res.status(200).send(pointResponse);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  const users = [
    '0x627306090abab3a6e1400e9345bc60c78a8bef57',
    '0xf17f52151ebef6c7334fad080c5704d77216b732',
    '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef',
    '0x821aea9a577a9b44299b9c15c88cf3087f3b5544',
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

router.post('/points/:user', async (req, res, next) => {
  const { user } = req.params;
  const { points } = req.body;
  try {
    const pointResponse = await assignPoints(user, points);
    res.status(200).send(pointResponse);
  } catch (e) {
    next(e);
  }
});

router.get('/points/:user', async (req, res, next) => {
  const { user } = req.params;
  try {
    const pointResponse = await getPoints(user);
    res.status(200).send(pointResponse);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
