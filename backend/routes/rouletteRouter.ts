import { app } from '../index';
import { Request, Response } from 'express';
import {playRoulette} from '../src/roulette'


export function setUpRouletteRoutes(){
  app.post('/api/spinRoulette',async (req: Request, res: Response) => {
    const numbers = req.body.numbers;
    const bets = req.body.bets; //hozzáadni a felhasználó nevet
    console.log(req.cookies);
    let finalResult = await playRoulette(numbers,bets,req.session.id,"test");
    res.status(200).json(finalResult).send();
  });

  app.post('/api/testcookie',async (req: any, res: any) => {
    console.log(req.cookies);
  });
}
