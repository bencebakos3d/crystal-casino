import {RouletteWheel} from "../src/roulette/rouletteWheel";
import {app} from "../index";


export function setUpRouletteRoutes():void{
    var wheel = new RouletteWheel();
    app.get("/playroulette",wheel.spin);
}
