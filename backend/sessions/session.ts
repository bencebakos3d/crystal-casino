import { Request, Response } from "express";
import { app } from "../index";

const userSession = require("express-session");
const MemoryStore = require('memorystore');

export function initSessions():void{
    app.use(userSession({
        secret:process.env.SECRETS,
        saveUninitialized:false,
        resave:false,
        cookie: {
            secure: true,
            store: new MemoryStore({
                checkPeriod: 86400000 // prune expired entries every 24h
              }),
            sameSite:"none",
            httpOnly:false 
        }
    }));
}

export function setUpSessionHandlers():void{
    app.get("/testsession",(reg:Request)=>{
        console.log("This is a test session.");
    });
}