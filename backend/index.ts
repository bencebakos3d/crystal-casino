
import {setUpRouletteRoutes} from "./routes/rouletteRouter";
import {initSessions, setUpSessionHandlers} from "./sessions/session"
const express = require('express');
const PORT = process.env.port || 3001;
export const app = express();

initSessions()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


setUpRouletteRoutes();
setUpSessionHandlers();
