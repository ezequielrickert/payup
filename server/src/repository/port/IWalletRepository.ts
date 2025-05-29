import { IWallet } from "../../domain/port/IWallet";

export interface IWalletRepository {
    findByUserCvu(userId: number): Promise<IWallet | null>;
    save(wallet: IWallet): Promise<void>;
    update(wallet: IWallet): Promise<void>;
}

