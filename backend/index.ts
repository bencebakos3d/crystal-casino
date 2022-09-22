const cors = require('cors');
import { setUpRouletteRoutes } from './routes/rouletteRouter';
import { initSessions, setUpSessionHandlers } from './sessions/session';

const express = require('express');
const PORT = process.env.port || 3001;
export const app = express();

app.use(cors());
app.use(express.json());

initSessions();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

setUpRouletteRoutes();
setUpSessionHandlers();
