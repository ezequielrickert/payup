import {IWallet} from "../../domain/port/IWallet";

export interface IWalletService {

    findByUserId(userId: number): Promise<IWallet | null>;
    deposit(userId: number, amount: number): Promise<IWallet>;
    withdraw(userId: number, amount: number): Promise<IWallet>;
    createWallet(userId: number, initialBalance?: number): Promise<IWallet>;
}