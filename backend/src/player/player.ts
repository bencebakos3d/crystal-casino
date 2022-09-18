export class Player{
    private sessionId:string;
    private balance:number;
    private bets:number[];
    private numbers:number[][];

    constructor(parameterNumbers:number[][],parameterBets:number[],parameterSessionId:string){
        this.sessionId = parameterSessionId;
        this.balance = 2000;
        this.bets = parameterBets;
        this.numbers =parameterNumbers;
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
}