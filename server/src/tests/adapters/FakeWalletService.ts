import { IWalletService } from "../../application/port/IWalletService";
import { WalletDto } from "../../dto/WalletDto";

export class FakeWalletService implements IWalletService {
    public wallets: WalletDto[] = [];

    async findByUserCvu(userId: number): Promise<WalletDto | null> {
        return this.wallets.find(w => w.userCvu === userId) || null;
    }

    async deposit(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.findByUserCvu(userCvu);
        if (!wallet) throw new Error("Wallet not found");
        wallet.balance += amount;
        return wallet;
    }

    async withdraw(userCvu: number, amount: number): Promise<WalletDto> {
        const wallet = await this.findByUserCvu(userCvu);
        if (!wallet) throw new Error("Wallet not found");
        wallet.balance -= amount;
        if (wallet.balance < 0) throw new Error("Insufficient balance");
        return wallet;
    }

    async createWallet(userId: number, initialBalance: number = 0): Promise<WalletDto> {
        if (await this.findByUserCvu(userId)) throw new Error("Wallet already exists");
        const wallet = new WalletDto(userId, initialBalance);
        this.wallets.push(wallet);
        return wallet;
    }
}

