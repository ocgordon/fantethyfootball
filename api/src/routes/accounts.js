import express from 'express';
import { getUsers } from '../services/accounts';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getUsers();
    res.status(200).send({ accounts });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
