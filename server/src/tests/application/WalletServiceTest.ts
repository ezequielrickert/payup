import {InMemoryWalletRepository} from "../adapters/InMemoryWalletRepository";
import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {WalletService} from "../../application/adapter/WalletService";


describe ( 'WalletService', () => {

    beforeEach(async () => {
        let walletRepository: IWalletRepository = new InMemoryWalletRepository();
        let walletService = new WalletService(walletRepository);
    });

    it ( 'should create a wallet for a user', async () => {

    });
});