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
    checkExpirationInterval: 10800000,
    expiration: 10800000 
})

export function initSessions():void{
    app.use(userSession({
        saveUninitialized : false,
        resave : false,
        secret:process.env.SECRETS,
        store:sessionStore,
        cookie: {
            expires: 10800000,
            secure: false,
            sameSite:false,
            httpOnly:false 
        },
    }));
}

export function setUpSessionHandlers():void{
    app.get("/testsession",(reg:Request)=>{
        console.log("This is a test session.");
    });
}