import {RouletteFields} from "./rouletteFields";
import {Player} from '../player/player';

function generateNumbers():number{
    return Math.floor(Math.random() * (360 - 0)) + 0;
}
export class RouletteWheel{
    private  wheelValue:number;
    private  countOfFields:number;
    private  sliceValue:number;
    
    public constructor(){
        this.wheelValue = 360;
        this.countOfFields = 37;
        this.sliceValue = this.wheelValue/this.countOfFields;
    }

    public getMultiplier(val:number[])
    {
        return 36/val.length;
    }

    private accumulate(values:number[]){
        let total:number = 0;
        for(let element of values){
            total+=element;
        }
        return total;
    }
    
    public spin(gamePlayer:Player){
        let spinvalue:number = generateNumbers();
        let finalIndex:number = Math.floor(spinvalue/this.sliceValue); 
        const winnerNumber = parseInt(RouletteFields.field(finalIndex)[0]);
        const winnerColor = RouletteFields.field(finalIndex)[1];
        let total = 0;
        console.log("ORIGINAL BALANCE:")
        console.log(gamePlayer.getBalance());
        if (this.accumulate(gamePlayer.getBets()) == 0 || this.accumulate(gamePlayer.getBets()) > gamePlayer.getBalance()){
            return -1;
        }

        for(let i=0;i<gamePlayer.getNumbers().length;++i)
        {
            let element = gamePlayer.getNumbers()[i];
            if(element.includes(winnerNumber)){
                total += gamePlayer.getBets()[i]*this.getMultiplier(element);
            }
        }
        
        if(total != 0){
            gamePlayer.increaseBalance(total);
        }

        else if(total == 0){
            gamePlayer.decreaseBalance(this.accumulate(gamePlayer.getBets()));
            total -= this.accumulate(gamePlayer.getBets());
        }

        let responseObject = {
            balance: gamePlayer.getBalance(),
            prize: total,
            winnerNumber: RouletteFields.field(finalIndex)[0]
        }

        console.log("CHOOSEN FIELDS:")
        console.log(gamePlayer.getNumbers());
        console.log("BETS:");
        console.log(gamePlayer.getBets());
        console.log("REWARDS:")
        console.log(total);
        return responseObject;
    }
}
