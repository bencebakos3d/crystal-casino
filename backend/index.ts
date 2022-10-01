const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';
import { dbHandler } from './database/databaseManager';


const express = require('express');
const cookieParser = require("cookie-parser");
const PORT = process.env.port || 3001;
export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/api/sessionstart',async (req:any, res:any) => {
  //await dbHandler.queryPlayer(req.session.id); //irni contains függvényt a dbbe
  res.cookie("SessionID",req.session.id).send();
});

setUpRouletteRoutes();
setUpSessionHandlers();
