import { Player, DEFAULTBALANCE, DEFAULTNAME } from '../src/player/player';
import config from '../config';

var mysql = require('mysql');

class SQLManager {
  private connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    port: config.mysql.port,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  constructor() {
    this.connection.connect();
  }

  async queryPlayer(id: string) {
    let gamer = new Player([], [], id, DEFAULTNAME);
    let result =  await this.queryRecordById(id);
    //if(result.SessionID !== id)throw "ids not matching";
    gamer.setSessionID(result.SessionID);
    gamer.setBlanace(result.Balance);
    gamer.setUsername(result.UserName);
    return gamer;
  }

  public async queryRecordById(id:string){
    //id 
    let queryObject = new Promise((resolve) => {
      this.connection.query("SELECT * FROM users WHERE SessionID LIKE  ?;",[id],(error: any, response: any) => {
        if (error) throw error;
        if (response.length == 0) {
          this.insertRecord(id,DEFAULTBALANCE.toString(),DEFAULTNAME);

          let result = {
            SesssionID: id,
            Balance: DEFAULTBALANCE,
            UserName: DEFAULTNAME,
            LastVisit: new Date(Date.now()).toLocaleString()
          };
          resolve(result); 
        }
          else {
          let result = {
            SessionID: response[0].SessionID,
            Balance: response[0].Balance,
            UserName: response[0].Username,
            LastVisit: response[0].LastVisit
          }; 
          resolve(result);
          };
      });
    });

    let x = await queryObject.then((val:any)=>{return val});
    //console.log(x);
    return x;
    //return await queryObject.then((val:any)=>{return val});
  }

  public clearExpiredRecord(){
    console.log("Expired records deleted!");
    this.connection.query("DELETE FROM users WHERE LastVisit <= DATE_SUB(NOW(), INTERVAL 1 DAY);", (error: any, response: any) =>{
      if(error)throw error;
    });
  }

  private insertRecord(id: string, balance: string, username: string) {
    this.connection.query("INSERT INTO users(SessionID, Balance, Username, LastVisit) VALUES (?, ?, ?, NOW());", [id,balance,username],(err: any) => {
      if (err) throw err;
    });
  }


  private updateRecord(id: string, balance: string, name: string) {
    this.connection.query("UPDATE users SET SessionID= ?, Balance= ?, Username=?, LastVisit=NOW() WHERE SessionID LIKE  ?;",[id,balance,name,id], (err: any) => {
      if (err) throw err;
    });
  }

  public playerUpdate(user: Player) {
    this.updateRecord(user.getSessionID(), user.getBalance().toString(), user.getUserName());
  }
}

export var dbHandler = new SQLManager();
