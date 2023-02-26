import { RouletteWheel } from '../game/roulette/rouletteWheel';
import { Player } from '../game/player/player';

export async function playRoulette(numbers: number[][], bets: number[], id: string, name: string, request: any) {
  let wheel = new RouletteWheel();
  let user = new Player(numbers, bets, id, name);
  await user.syncFromDB(request);
  let spinResult = wheel.spin(user);
  console.log(request.session.id);
  return spinResult;
}
