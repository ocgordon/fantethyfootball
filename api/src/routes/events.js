import express from 'express';
import fetchEvents from '../services/events';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { eventType, from, to, tokenId } = req.query;
  try {
    const events = await fetchEvents(eventType, from, to, tokenId);
    res.status(200).send(events);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
