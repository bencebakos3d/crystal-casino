import { RouletteWheel } from '../src/roulette/rouletteWheel';
import {Player} from '../src/player/player';


export async function playRoulette(numbers:number[][],bets:number[],id:string, name:string,request:any){
    let wheel = new  RouletteWheel();
    let user = new Player(numbers,bets,id,name);
    await user.syncFromDB(request);
    let spinResult = wheel.spin(user);
    await user.updateSession(request);
    console.log(request.session.id);
    return spinResult;
}