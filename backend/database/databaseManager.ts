import { Player} from '../src/player/player';
import config from '../config';

var mysql = require('mysql');

/*
The SQLManager class is used to instantiate the dbHandler global object,which
is used by many functions, the goal of this object to handle I/O to the database.

--------------------------------------------------------------------------------
queryPlayer(id):
PARAMETER: id -> session id of the player
RETURN VALUE: An instance of the Player class, containing the queried data,
if the player doesent exist, this function call going to create it.

--------------------------------------------------------------------------------

queryRecordById(id)
PARAMETERS: id-> session id of the player
RETURN VALUE: a result object containing the record fields:(SessionID,Balance,UserName,LastVisit)
*/
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
    let gamer = new Player([], [], id,config.defaultValues.defaultUsername);
    let result =  await this.queryRecordById(id);
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
          this.insertRecord(id,config.defaultValues.defaultBalance,config.defaultValues.defaultUsername);

          let result = {
            SesssionID: id,
            Balance: config.defaultValues.defaultBalance,
            UserName: config.defaultValues.defaultUsername,
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
    return x;
  }

  public clearExpiredRecord(){
    console.log("Expired records deleted!");
    this.connection.query("DELETE FROM users WHERE LastVisit <= DATE_SUB(NOW(), INTERVAL 1 DAY);", (error: any, response: any) =>{
      if(error)throw error;
    });
  }

  private insertRecord(id: any, balance: any, username: any) {
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
