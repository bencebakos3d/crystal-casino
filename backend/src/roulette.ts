import { RouletteWheel } from '../src/roulette/rouletteWheel';
import {Player} from './player/player';
import { dbHandler } from '../database/databaseManager';


export async function playRoulette(numbers:number[][],bets:number[],id:string, name:string){
    let wheel = new  RouletteWheel();
    let user = new Player(numbers,bets,id,name);// player classba update függvény hozzáadása
    await user.syncFromDB();
    let spinResult = wheel.spin(user);
    dbHandler.playerUpdate(user);
    return spinResult;// újratervezni a visszatérési értéket a spinbe + updatelni a databaset
}