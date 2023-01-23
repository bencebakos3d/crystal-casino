import { dbHandler } from "../../database/databaseManager";
/*
    The player class contains and handles, the data of the player.If you want to 
    manipulate the inner data of the object use the specified API functions.
    Usage:
    import Player class from this file, then instantiate a player object,
    use the getter/setter functions in the following format:
    [objectname].set[VariableName]()
    [objectname].get[VariableName]()
    for example:
    let name = "john"
    let myplayer = new Player([[10],[30]],[100,100],sessionId,name);
    myplayert.setUserName(name);

    Helper functions:
    increase balance(value) : increases the balance of the player  by value amount
    increase balance(value) : decreases the balance of the player  by value amount
    syncFromDB():             loads data from databse to palyert object 
*/
export class Player{

    private sessionId:string;
    private userName:string;
    private balance:number;
    private bets:number[];
    private numbers:number[][];

    constructor(parameterNumbers:number[][],parameterBets:number[],parameterSessionId:any,name:any){
        this.sessionId = parameterSessionId;
        this.userName = name;
        this.balance = 2000;        
        this.bets = parameterBets;
        this.numbers =parameterNumbers;
    }

    async syncFromDB(){
        let temporary = await dbHandler.queryRecordById(this.sessionId);
        this.setBlanace(temporary.Balance);
        this.setUsername(temporary.UserName);
        this.sessionId = temporary.SessionID;
    }

    public getNumbers(){
        return this.numbers;
    }
    public getBets() {
        return this.bets;
    }

    public setBets(parameterBets:number[]):void {
        this.bets = parameterBets;
    }

    public getBalance():number{
        return this.balance;
    }

    public setBlanace(value:number):void{
        this.balance = value;
    }

    public increaseBalance(value:number):void{
        this.balance += value;
    }

    public decreaseBalance(value:number):void{
        this.balance-=value;
    }

    public getSessionID(){
        return this.sessionId;
    }

    public setSessionID(id:string):void{
        this.sessionId = id;
    }

    public getUserName(){
        return this.userName;
    }

    public setUsername(name:string){
        this.userName = name;
    }
}