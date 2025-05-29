export interface IWallet {
    // No ID included as ORM is the one responsible for generating it
    userId: number; // Reference to the user
    balance: number;
    deposit(amount: number): IWallet; // Deposit money into the wallet
    withdraw(amount: number): IWallet; // Withdraw money from the wallet
}

