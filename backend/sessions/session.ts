import { Request, Response } from "express";
import { app } from "../index";

const userSession = require("express-session");


export function initSessions():void{
    app.use(userSession({
        secret:"developmentsecret"
    }));
}

export function setUpSessionHandlers():void{
    app.get("/testsession",(reg:Request)=>{
        console.log("This is a test session.");
    });
}