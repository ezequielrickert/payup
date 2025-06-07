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
        console.log(JSON.stringify(wallet, null, 2));
        try {
            await this.walletRepo.save(wallet);
            return this.mapToDto(wallet);
        } catch (error) {
            console.error("Error al guardar o mapear el wallet:", error);
            throw error; // Opcional: relanza el error si quieres que se propague
        }
    }

    async withdraw(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserCvu(userCvu);
        console.log(JSON.stringify(wallet, null, 2));
        if (!wallet) throw new Error("Wallet not found");
        const withdrawn = wallet.withdraw(amount);
        console.log(JSON.stringify(withdrawn, null, 2));
        await this.walletRepo.update(withdrawn);
        return this.mapToDto(withdrawn);
    }

    async deposit(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.walletRepo.findByUserCvu(userCvu);
        console.log(JSON.stringify(wallet, null, 2));
        if (!wallet) throw new Error("Wallet not found");
        const deposited = wallet.deposit(amount);
        console.log(JSON.stringify(deposited, null, 2));
        await this.walletRepo.update(deposited);
        return this.mapToDto(deposited);
    }

    private mapToDto(wallet: IWallet): WalletDto {
        return new WalletDto(wallet.userCvu, wallet.balance);
    }
}

