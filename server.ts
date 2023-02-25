const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions } from './sessions/session';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
import config from './config';

const PORT = process.env.PORT;
const url = process.env.URL;

export const app = express();

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/setcookie', async (req: any, res: any) => {
  req.session.balance = config.defaultValues.defaultBalance;
  req.userName = config.defaultValues.defaultUsername;
  res.send(req.session.id);
});

app.listen(9000);
setUpRouletteRoutes();
