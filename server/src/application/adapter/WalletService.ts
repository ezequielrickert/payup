import { IWalletRepository } from "../../repository/port/IWalletRepository";
import { Wallet } from "../../domain/adapter/Wallet";
import { IWallet } from "../../domain/port/IWallet";
import { IWalletService } from "../port/IWalletService";
import { WalletDto } from "../../dto/WalletDto";

export class WalletService implements IWalletService {
    constructor(private readonly walletRepo: IWalletRepository) {}

    async findByUserId(userId: number): Promise<WalletDto | null> {
        const wallet = await this.walletRepo.findByUserId(userId);
        return wallet ? this.mapToDto(wallet) : null;
    }

    async createWallet(userId: number, initialBalance: number = 0): Promise<WalletDto> {
        const existing = await this.walletRepo.findByUserId(userId);
        if (existing) throw new Error("Wallet already exists for user");
        const wallet = new Wallet(userId, initialBalance);
        await this.walletRepo.save(wallet);
        return this.mapToDto(wallet);
    }

    async deposit(userId: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserId(userId);
        if (!wallet) throw new Error("Wallet not found");
        const deposited = wallet.deposit(amount);
        await this.walletRepo.update(deposited);
        return this.mapToDto(deposited);
    }

    async withdraw(userId: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserId(userId);
        if (!wallet) throw new Error("Wallet not found");
        const withdrawn = wallet.withdraw(amount);
        await this.walletRepo.update(withdrawn);
        return this.mapToDto(withdrawn);
    }

    private mapToDto(wallet: IWallet): WalletDto {
        return new WalletDto(wallet.userId, wallet.balance);
    }
}

