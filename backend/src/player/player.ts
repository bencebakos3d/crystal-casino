import { dbHandler } from "../../database/databaseManager";

/*Constant values START*/
export const DEFAULTNAME:string ="Default";
export const DEFAULTBALANCE:number = 2000;
/*Constant values END*/

export class Player{

    private sessionId:string;
    private userName:string;
    private balance:number;
    private bets:number[];
    private numbers:number[][];

    constructor(parameterNumbers:number[][],parameterBets:number[],parameterSessionId:string,name:string){
        this.sessionId = parameterSessionId;
        this.userName = name;
        this.balance = 2000;        
        this.bets = parameterBets;
        this.numbers =parameterNumbers;
    }

    async syncFromDB(){
        //kijavtiani a konkurenciát NAGYON NEM JÓ
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