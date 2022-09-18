import {RouletteFields} from "./rouletteFields";
import {Player} from '../player/player';

//https://www.youtube.com/watch?v=WIIf3WaO5x4
//https://www.grc.com/otg/uheprng.htm?fbclid=IwAR1xL4H59C4z_pWLrIfPpy8B1tDpcD_lGVHBBZgTEXiuc029RXs3zuxZTnY


/*
    1 szelet 9.7 fok
    1 teljes rulett kör 360 fok
    1 pörgetés = lefele kerekít(pörgettett fok / 1 szelet)
    pl.: 1 pörgetés = lekerekít(38/9.7) = 3.91 --most lekerekítem
    1 pörgetés = 3 szelet
    pozició = jelenlegi elem +3 ;
    return rulettefields[pozició]
*/

function testrandom():number{
    return Math.floor(Math.random() * (360 - 0)) + 0;
}


export class RouletteWheel{
    private  wheelValue:number;
    private  countOfFields:number;
    private  currentpos:number;
    private  sliceValue:number;
    
    public getMultiplier(val:number[])
    {
        return 36/val.length;
    }


    public constructor(){
        this.wheelValue = 360;
        this.countOfFields = 37;
        this.currentpos = 0;
        this.sliceValue = this.wheelValue/this.countOfFields;
    }
    
    public spin(gamePlayer:Player){
        let spinvalue:number = testrandom();
        let finalIndex:number = Math.floor(spinvalue/this.sliceValue); 
        this.currentpos += finalIndex;
        const winnerNumber = parseInt(RouletteFields.field(finalIndex)[0]);
        const winnerColor = RouletteFields.field(finalIndex)[1];
        let total = 0;

        for(let i=0;i<gamePlayer.getNumbers().length;++i)
        {
            let element = gamePlayer.getNumbers()[i];
            if(element.includes(winnerNumber)){
                total += gamePlayer.getBets()[i]*this.getMultiplier(element);
            }
        }
        console.log(winnerNumber);
        console.log(gamePlayer.getNumbers());
        console.log(total);
    }
}
