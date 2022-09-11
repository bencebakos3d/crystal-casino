import {wheel} from "../src/roulette/rouletteWheel";

const express = require('express');
const app = express();

export function startRoulettEndpoints(){
    app.listen("playroulette",wheel.spin());
}