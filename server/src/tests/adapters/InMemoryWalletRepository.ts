import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {IWallet} from "../../domain/port/IWallet";

export class InMemoryWalletRepository implements IWalletRepository {

    private wallets: Map<number, IWallet> = new Map();

    private id: number = 0;

    findByUserCvu(userId: number): Promise<IWallet | null> {
        for (const wallet of this.wallets.values()) {
            if (wallet.userCvu === userId) {
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
        const dbWallet = this.wallets.get(wallet.userCvu);
        if (dbWallet) {
            this.wallets.delete(dbWallet.userCvu);
            this.wallets.set(wallet.userCvu, wallet);
        }
        return Promise.resolve(undefined);
    }

}