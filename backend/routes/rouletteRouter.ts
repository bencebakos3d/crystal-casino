import {app} from "../index";
import {wheel} from "../src/roulette/rouletteWheel";

function EpPlayroulette(){
    wheel.spin();
}


export function setUpRouletteRoutes():void{
    app.get("/playroulette",EpPlayroulette);
}
