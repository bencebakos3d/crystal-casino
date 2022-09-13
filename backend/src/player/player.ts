class Player{
    private name:string;
    private balance:number;
    private bet:number;

    constructor(){
        this.name = "";
        this.balance = 0;
        this.bet = 0;
    }

    public won(){
        this.balance += this.bet;
        this.bet = 0;
    }

    public lost(){
        this.bet = 0;
    }

    public placeBets(amount:number){
        if(amount > this.balance){
            return -1;
        }
        else{
            this.bet = amount;
            this.balance-= amount;
            return 0;
        }
    }
}