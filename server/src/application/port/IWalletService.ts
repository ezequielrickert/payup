import {IWallet} from "../../domain/port/IWallet";
import { WalletDto } from "../../dto/WalletDto";

export interface IWalletService {

    findByUserId(userId: number): Promise<WalletDto | null>;
    deposit(userId: number, amount: number): Promise<WalletDto>;
    withdraw(userId: number, amount: number): Promise<WalletDto>;
    createWallet(userId: number, initialBalance?: number): Promise<WalletDto>;
}

