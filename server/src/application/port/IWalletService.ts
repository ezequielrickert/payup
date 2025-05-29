import {IWallet} from "../../domain/port/IWallet";
import { WalletDto } from "../../dto/WalletDto";

export interface IWalletService {

    findByUserCvu(userCvu: number): Promise<WalletDto | null>;
    deposit(userCvu: number, amount: number): Promise<WalletDto>;
    withdraw(userCvu: number, amount: number): Promise<WalletDto>;
    createWallet(userCvu: number, initialBalance?: number): Promise<WalletDto>;
}

