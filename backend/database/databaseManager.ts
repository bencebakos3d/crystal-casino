import { response } from "express";
import { resolve } from "path";
import {Player} from "../src/player/player";

var mysql = require("mysql");

class SQLManager{
    private connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "kZ98U001y$aD",
      database: "diamondcasino",
      port: 3306
    });
    
    constructor(){
      this.connection.connect();
    }

    async queryPlayer(id:string){
      let gamer = new Player([],[],id,"default");
      gamer.setBlanace(2000);
      let queryObject = new Promise((resolve)=>{
        this.connection.query("SELECT * FROM users WHERE SessionID LIKE \""+ id +"\";",(error:any, response:any)=>{
          if(error)throw error;
          let result ={
            uname: response[0].Username,
            balance: response[0].Balance
          }
          resolve(result);
        });
      })
      let userValues = await queryObject.then((val:any)=>{ return val});
      gamer.setBlanace(userValues.balance);
      gamer.setUsername(userValues.uname);
      return gamer;
    }

    private insertRecord(id:string, balance:string, username:string, lastLogin:string){
      let commandInsert:string = "INSERT INTO users(SessionID, Balance, Username, LastVisit) ";
      let commandValues:string = "VALUES ("+"\""+id+"\", \""+balance+"\", \""+username+"\", "+"\""+lastLogin+"\");";
      let commandFull:string = commandInsert + commandValues;
      this.connection.query(commandFull,(err:any)=>{if(err)throw err;});
    }

    private updateRecord(id:string, balance:string, name:string, visit:string){
      let commandUpdate = "UPDATE users ";
      let commandSet = "SET SessionID="+"\""+id+"\", Balance="+"\""+ balance +"\", Username="+"\""+name+"\", LastVisit="+"\""+visit+"\" ";
      let commandWhere = "WHERE SessionID LIKE \""+id+"\";";
      let commandFull = commandUpdate + commandSet + commandWhere;
      this.connection.query(commandFull,(err:any)=>{if(err)throw err;});
    }

    public playerUpdate(user:Player){
      let timeOject = new Date();
      let timeString:string = timeOject.getFullYear() +"."+ timeOject.getMonth()+"."+timeOject.getHours();
      this.updateRecord(user.getSessionID(),user.getBalance().toString(),user.getUserName(),timeString);
    }

    async insertIfNotExist(id:string){
      let commandInsert:string = "INSERT IGNORE INTO users(SessionID, Balance, Username, LastVisit) ";
      let commandSelect:string = "SELECT \""+id+"\", \"2000\", \"default\", \"1900.01.01\" FROM users "
      let commandWhere:string = "WHERE SessionID NOT LIKE "+"\""+id+"\";";
      let commandFull:string = commandInsert + commandSelect + commandWhere;
      let queryObject = new Promise((resolve)=>{
        this.connection.query(commandFull,(error:any)=>{throw error;});
        resolve(1);
      })

      await queryObject.then();
    }
}

export var dbHandler = new SQLManager();