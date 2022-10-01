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

app.get('/setcookie',async (req: any, res: any) => {
  await dbHandler.queryPlayer(req.session.id); //irni contains függvényt a dbbe
  res.cookie(`SessionID`, req.session.id);
  res.send('Cookie have been saved successfully');
});

app.get('/testcookie',async (req: any, res: any) => {
  console.log(req.cookies);
});



setUpRouletteRoutes();
setUpSessionHandlers();
