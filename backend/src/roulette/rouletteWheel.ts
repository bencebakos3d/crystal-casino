import {RouletteFields} from "./rouletteFields";
import {Player} from '../player/player';

function generateNumbers():number{
    return Math.floor(Math.random() * 36) + 0;
}
export class RouletteWheel{   
    public spin(gamePlayer:Player){
        console.log("Spin start")
        let finalIndex:number = generateNumbers();
        const winnerNumber = parseInt(RouletteFields.field(finalIndex)[0]);
        let total = 0;

        if(gamePlayer.getBets().length == 0){
            console.log("error no bets given!");
        }

        for(let i=0;i<gamePlayer.getNumbers().length;++i){
            if(gamePlayer.getNumbers()[i].includes(winnerNumber)){
                total += gamePlayer.getBets()[i]*(36/gamePlayer.getNumbers()[i].length);
                gamePlayer.increaseBalance(total);
            }
            else{
                gamePlayer.decreaseBalance(gamePlayer.getBets()[i]);
            }
        }
        
        console.log(gamePlayer);
        let responseObject = {
            balance: gamePlayer.getBalance(),
            prize: total,
            winnerNumber: RouletteFields.field(winnerNumber)[0]
        }

        return responseObject;
    }
}
