import { RouletteWheel } from '../src/roulette/rouletteWheel';
import {Player} from '../src/player/player';
import { dbHandler } from '../database/databaseManager';


export async function playRoulette(numbers:number[][],bets:number[],id:string, name:string){
    let wheel = new  RouletteWheel();
    let user = new Player(numbers,bets,id,name);
    await user.syncFromDB();
    let spinResult = wheel.spin(user);
    dbHandler.playerUpdate(user);
    return spinResult;
}