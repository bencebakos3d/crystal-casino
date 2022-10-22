const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';
import { dbHandler } from './database/databaseManager';
// const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.port || 3001;
const url = process.env.API_URL || 'http://localhost:3000';
export const app = express();

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

let time = 1 * 60 * 1000;
setInterval(function () {
  dbHandler.clearExpiredRecord();
}, time);
app.get('/api/setcookie', async (req: any, res: any) => {
  await dbHandler.queryPlayer(req.session.id); //irni contains függvényt a dbbe
  res.cookie(`SessionID`, req.session.id);
  res.send('Cookie have been saved successfully');
});

// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/', function (req: any, res: any) {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.listen(9000);

setUpSessionHandlers();
setUpRouletteRoutes();
