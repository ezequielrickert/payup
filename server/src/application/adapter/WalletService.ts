import { IWalletRepository } from "../../repository/port/IWalletRepository";
import { Wallet } from "../../domain/adapter/Wallet";
import { IWallet } from "../../domain/port/IWallet";
import { IWalletService } from "../port/IWalletService";
import { WalletDto } from "../../dto/WalletDto";

export class WalletService implements IWalletService {
    constructor(private readonly walletRepo: IWalletRepository) {}

    async findByUserCvu(userCvu: number): Promise<WalletDto | null> {
        const wallet = await this.walletRepo.findByUserCvu(userCvu);
        return wallet ? this.mapToDto(wallet) : null;
    }

    async createWallet(userCvu: number, initialBalance: number = 0): Promise<WalletDto> {
        const existing = await this.walletRepo.findByUserCvu(userCvu);
        if (existing) throw new Error("Wallet already exists for user");
        const wallet = new Wallet(userCvu, initialBalance);
        await this.walletRepo.save(wallet);
        return this.mapToDto(wallet);
    }

    async deposit(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserCvu(userCvu);
        if (!wallet) throw new Error("Wallet not found");
        const deposited = wallet.deposit(amount);
        await this.walletRepo.update(deposited);
        return this.mapToDto(deposited);
    }

    async withdraw(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserCvu(userCvu);
        if (!wallet) throw new Error("Wallet not found");
        const withdrawn = wallet.withdraw(amount);
        await this.walletRepo.update(withdrawn);
        return this.mapToDto(withdrawn);
    }

    private mapToDto(wallet: IWallet): WalletDto {
        return new WalletDto(wallet.userCvu, wallet.balance);
    }
}

