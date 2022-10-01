const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';
import { dbHandler } from './database/databaseManager';

const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = process.env.port || 3001;
export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/setcookie', (req: any, res: any) => {
  res.cookie(`Cookie token name`, `encrypted cookie string Value`);
  res.send('Cookie have been saved successfully');
});

setUpRouletteRoutes();
setUpSessionHandlers();
