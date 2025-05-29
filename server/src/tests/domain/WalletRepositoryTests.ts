import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {IWallet} from "../../domain/port/IWallet";
import {InMemoryWalletRepository} from "../adapters/InMemoryWalletRepository";
import {Wallet} from "../../domain/adapter/Wallet";

describe('WalletRepository', () => {
    let walletRepository: IWalletRepository;
    let testWallet: IWallet;

    beforeEach(async () => {
        walletRepository = new InMemoryWalletRepository();
        testWallet = new Wallet(1, 100);
    });

    it('should save and find a wallet by userId', async () => {
        await walletRepository.save(testWallet);

        const foundWallet = await walletRepository.findByUserCvu(1);

        expect(foundWallet).not.toBeNull();
        expect(foundWallet?.userCvu).toBe(testWallet.userCvu);
        expect(foundWallet?.balance).toBe(testWallet.balance);
    });

    it ('should return null when finding by non-existent userId', async () => {
        const foundWallet = await walletRepository.findByUserCvu(999);

        expect(foundWallet).toBeNull();
    });

    it ('should update an existing wallet', async () => {
        await walletRepository.save(testWallet);

        const updatedWallet = new Wallet(1, 200);
        await walletRepository.update(updatedWallet);

        const foundWallet = await walletRepository.findByUserCvu(1);

        expect(foundWallet).not.toBeNull();
        expect(foundWallet?.userCvu).toBe(updatedWallet.userCvu);
        expect(foundWallet?.balance).toBe(updatedWallet.balance);
    });

    it ('should not update a non-existent wallet', async () => {
        const nonExistentWallet = new Wallet(999, 300);
        await walletRepository.update(nonExistentWallet);

        const foundWallet = await walletRepository.findByUserCvu(999);

        expect(foundWallet).toBeNull();
    });
});
