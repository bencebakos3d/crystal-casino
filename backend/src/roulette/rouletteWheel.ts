import {RouletteFields} from "./rouletteFields";
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
class RouletteWheel{
    public constructor(){
        console.log(RouletteFields[0]);
    }

}