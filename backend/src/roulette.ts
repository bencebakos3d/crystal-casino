import { RouletteWheel } from '../src/roulette/rouletteWheel';
import {Player} from './player/player';


export function playRoulette(numbers:number[][],bets:number[],id:string, name:string){
    let wheel = new  RouletteWheel();
    let user = new Player(numbers,bets,id,name);// player classba update függvény hozzáadása
    user.syncFromDB();
    return wheel.spin(user);// újratervezni a visszatérési értéket a spinbe
}