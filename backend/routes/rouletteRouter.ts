import { app } from '../index';
import { Request, Response } from 'express';
import { playRoulette } from '../services/rouletteService';
import config from '../config';

export function setUpRouletteRoutes() {
  app.post('/api/spinRoulette', async (req: Request, res: Response) => {
    let finalResult: any;
    finalResult = await playRoulette(req.body.numbers, req.body.bets, req.session.id, config.defaultValues.defaultUsername!,req);
    // @ts-ignore
    req.session.balance = finalResult.balance;
    res.status(200).json(finalResult);
  });
}
