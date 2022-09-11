import {wheel} from "../src/roulette/rouletteWheel";
import {app} from "../index";


app.get("/playroulette",wheel.spin);