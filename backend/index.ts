const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';
const express = require('express');
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

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


app.get('/setcookie', async (req: any, res: any) => {
  req.session.balance = config.defaultValues.defaultBalance;
  req.userName = "test";
  res.send(req.session.id);
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
