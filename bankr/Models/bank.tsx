import { Guid } from 'guid-typescript'
import Account from 'Components/account';

export default class Bank
{
    BankAccount: AccountModel
    Accounts: AccountModel[]
    Name: string

    constructor(name: string, accounts: string[]) {
        
        this.BankAccount = new AccountModel("Bank");
        this.BankAccount.post(new TransactionModel(Guid.create(), null, this.BankAccount.Id, 500000, new Date(), "Opening the bank"));
        this.Accounts = [
            this.BankAccount
        ]

        const newAccounts = accounts.map(x => {
            const account = new AccountModel(x);
            return account
        });

        this.Accounts = this.Accounts.concat(newAccounts);
        this.Accounts.filter(x => x !== this.BankAccount).forEach(x => this.Transfer(this.BankAccount.Id, x.Id, 1500, (a,b) => `${b.Name} Starting position`));

        this.Name = name;
    }

    Transfer(from: Guid, to: Guid, amount: number, narrative: (from: AccountModel | null, to:AccountModel) => string)
    {
        if (from === to) return;

        const id = Guid.create();
        const fromAccount = this.Accounts.find(x => x.Id.equals(from));
        const toAccount = this.Accounts.find(x => x.Id.equals(to));
        fromAccount!.post(new TransactionModel(id, from, to, -amount, new Date(), narrative(fromAccount ?? null, toAccount!)))
        toAccount!.post(new TransactionModel(id, from, to, amount, new Date(), narrative(fromAccount ?? null, toAccount!)))
        console.log(`Posted transaction of ${amount} from ${from} to ${to}`)
    }

    Ledger() {
        var fullLedger : TransactionModel[] = this.Accounts.map(x => 
            x.Ledger.filter(t => t.Amount > 0)).flat();
        var sortedLedger = fullLedger.filter(x => !x.From?.equals(x.To)).sort((a,b) => a.Timestamp > b.Timestamp ? -1 : 1);
        console.log(sortedLedger);
        return sortedLedger;
    }

    Restart() {
        this.Accounts.forEach(x => x.clear());
    }
}

export class AccountModel {
    Name: string
    Balance: number = 0
    Id: Guid
    Ledger: TransactionModel[] = []

    constructor(name: string) {
        this.Name = name;
        this.Id = Guid.create();
    }

    post(transaction: TransactionModel)
    {
        this.Ledger.push(transaction);
        this.updateBalance()
        console.log(`Transaction posted. New balance of ${this.Id} is ${this.Balance}`)
   }

   updateBalance() {
       this.Balance = this.Ledger.reduce((running, tran) => running + tran.Amount, 0)
   }

   clear() {
       this.Ledger.splice(1);
       this.updateBalance();
   }
}

export class TransactionModel {
    From: Guid | null
    To: Guid
    Amount: number
    Timestamp: Date
    Id: Guid
    Narrative: string

    constructor(id: Guid, from: Guid | null, to: Guid, amount: number, timestamp: Date, narrative: string) {
        this.Id = id;
        this.From = from;
        this.To = to;
        this.Amount = amount;
        this.Timestamp = timestamp;
        this.Narrative = narrative;
    }
}
