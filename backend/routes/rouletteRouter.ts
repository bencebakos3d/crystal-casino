import {wheel} from "../src/roulette/rouletteWheel";
import {app} from "../index";


export function setUpRouletteRoutes():void{
    app.get("/playroulette",wheel.spin);
}
