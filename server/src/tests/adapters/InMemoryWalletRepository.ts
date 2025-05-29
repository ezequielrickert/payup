import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {IWallet} from "../../domain/port/IWallet";

export class InMemoryWalletRepository implements IWalletRepository {

    private wallets: Map<number, IWallet> = new Map();

    private id: number = 0;

    findByUserId(userId: number): Promise<IWallet | null> {
        for (const wallet of this.wallets.values()) {
            if (wallet.userId === userId) {
                return Promise.resolve(wallet);
            }
        }
        return Promise.resolve(null);
    }

    save(wallet: IWallet): Promise<void> {
        this.wallets.set(this.id + 1, wallet);
        return Promise.resolve(undefined);
    }

    update(wallet: IWallet): Promise<void> {
        const dbWallet = this.wallets.get(wallet.userId);
        if (dbWallet) {
            this.wallets.delete(dbWallet.userId);
            this.wallets.set(wallet.userId, wallet);
        }
        return Promise.resolve(undefined);
    }

}