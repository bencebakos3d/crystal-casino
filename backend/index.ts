const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';
import { dbHandler } from './database/databaseManager';
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

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

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//timeot berakni környezeti változoba
let time = 1000 * 60 * 60 * 24;
setInterval(function () {
  dbHandler.clearExpiredRecord();
}, time);
app.get('/setcookie', async (req: any, res: any) => {
  await dbHandler.queryPlayer(req.session.id); //irni contains függvényt a dbbe
  res.cookie(`SessionID`, req.session.id);
  res.send('Cookie have been saved successfully');
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
//   app.get('/', function (req: any, res: any) {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
//   console.log('sending frontend');
// }

app.listen(9000);

setUpSessionHandlers();
setUpRouletteRoutes();
