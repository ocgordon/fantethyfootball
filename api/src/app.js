import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fantethy from './routes/fantethy';
import accounts from './routes/accounts';
import events from './routes/events';

const app = express();

// cors & body parser middleware should come before any routes are handled
app.use(cors({ exposedHeaders: ['Total-Count', 'Report-Total'] }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// put your routes here
app.use('/fantethy', fantethy);
app.use('/accounts', accounts);
app.use('/events', events);

export default app;
module.exports = app;
