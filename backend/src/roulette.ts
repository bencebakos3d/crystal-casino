import { RouletteWheel } from '../src/roulette/rouletteWheel';
import {Player} from './player/player';

export function playRoulette(numbers:number[][],bets:number[],id:string ){
    let wheel = new  RouletteWheel();
    let user = new Player(numbers,bets,id);
    return wheel.spin(user);
}