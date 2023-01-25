import {RouletteFields} from "./rouletteFields";
import {Player} from '../player/player';

function generateNumbers():number{
    //return Math.floor(Math.random() * 36) + 0;
    return 10;
}
export class RouletteWheel{   
    public spin(gamePlayer:Player){
        
        let finalIndex:number = generateNumbers();
        const winnerNumber = parseInt(RouletteFields.field(finalIndex)[0]);
        let total = 0;

        //Debug code begins
        gamePlayer.setNumbers([[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]);
        gamePlayer.setBets([1]);
        console.log(gamePlayer);
        //Debug code ends
        if(gamePlayer.getBets().length == 0){
            console.log("error no bets given!");
        }

        for(let i=0;i<gamePlayer.getNumbers().length;++i){
            if(gamePlayer.getNumbers()[i].includes(winnerNumber)){
                total += gamePlayer.getBets()[i]*(36/gamePlayer.getNumbers()[i].length);
                gamePlayer.decreaseBalance(gamePlayer.getBets()[i]);
                gamePlayer.increaseBalance(total);
            }
            else{
                console.log(gamePlayer.getBalance());
                gamePlayer.decreaseBalance(gamePlayer.getBets()[i]);
            }
        }
        
        let responseObject = {
            balance: gamePlayer.getBalance(),
            prize: total,
            winnerNumber: RouletteFields.field(winnerNumber)[0]
        }

        return responseObject;
    }
}
