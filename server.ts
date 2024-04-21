import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions } from './sessions/session';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import config from './config';

const PORT = process.env.PORT;

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/api/setcookie', async (req: any, res: any) => {
  req.session.balance = config.defaultValues.defaultBalance;
  req.userName = config.defaultValues.defaultUsername;
  res.send(req.session.id);
});

app.listen(9000);
setUpRouletteRoutes();

app.get('/*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
