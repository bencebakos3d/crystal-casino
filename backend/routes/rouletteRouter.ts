import { app } from '../index';
import { Request, Response } from 'express';
import { playRoulette } from '../src/roulette';

export function setUpRouletteRoutes() {
  app.post('/api/spinRoulette', async (req: Request, res: Response) => {
    const numbers = req.body.numbers;
    const bets = req.body.bets; //hozzáadni a felhasználó nevet
    console.log(req.cookies);
    let finalResult: any;
    if (req.cookies.length != 0) {
      finalResult = await playRoulette(numbers, bets, req.cookies.SessionID, 'test');
    } else {
      finalResult = await playRoulette(numbers, bets, req.session.id, 'test');
    }
    console.log(finalResult);
    res.status(200).json(finalResult);
  });
}
