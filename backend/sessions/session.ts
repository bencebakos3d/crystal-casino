import { Request, Response } from "express";
import { app } from "../index";
import config from '../config';

const userSession = require("express-session");
var MySQLStore = require('express-mysql-session')(userSession);

var sessionStore = new MySQLStore({
    host: config.mysql.host,
    user: config.mysql.user,
    port: config.mysql.port,
    password: config.mysql.password,
    database: config.mysql.database,
})

export function initSessions():void{
    app.use(userSession({
        saveUninitialized : false,
        resave : true,
        secret:process.env.SECRETS,
        store:sessionStore,
        cookie: {
            secure: false,
            sameSite:false,
            httpOnly:false 
        }
    }));
}

export function setUpSessionHandlers():void{
    app.get("/testsession",(reg:Request)=>{
        console.log("This is a test session.");
    });
}