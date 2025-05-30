export interface IWallet {
    userId: number;
    userCvu: number; // Reference to the user
    balance: number;
    deposit(amount: number): IWallet; // Deposit money into the wallet
    withdraw(amount: number): IWallet; // Withdraw money from the wallet
}

