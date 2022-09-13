import {app} from "../index";
import {wheel} from "../src/roulette/rouletteWheel";


export function setUpRouletteRoutes():void{
    app.get("/playroulette",wheel.spin);
}
