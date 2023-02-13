import { app } from '../index';
import { Request, Response } from 'express';
import { playRoulette } from '../services/rouletteService';

export function setUpRouletteRoutes() {
  app.post('/api/spinRoulette', async (req: Request, res: Response) => {
    const numbers = req.body.numbers;
    const bets = req.body.bets; 
    let finalResult: any;
    if (req.cookies.length != 0) {
      finalResult = await playRoulette(numbers, bets, req.session.id, 'test',req);
    } else {
      finalResult = await playRoulette(numbers, bets, req.session.id, 'test',req);
    }

    // @ts-ignore
    req.session.balance = finalResult.balance;
    res.status(200).json(finalResult);
  });
}
