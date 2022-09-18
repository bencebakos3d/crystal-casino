import { app } from '../index';
import { Request, Response } from 'express';
import {playRoulette} from '../src/roulette'

export function setUpRouletteRoutes(): void {
  app.post('/api/spinRoulette', (req: Request, res: Response) => {
    const numbers = req.body.numbers;
    const bets = req.body.bets;
    res.status(200).json(playRoulette(numbers,bets,req.session.id));
  });
}
