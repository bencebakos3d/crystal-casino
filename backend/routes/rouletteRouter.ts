import {app} from "../index";
import {Request,Response} from  "express";
import {wheel} from "../src/roulette/rouletteWheel";



function EpPlayroulette(req:Request,res:Response){
    //wheel.spin();
    console.log(req.body);
}


export function setUpRouletteRoutes():void{
    app.post("/api/spinRoulette",EpPlayroulette);
}
