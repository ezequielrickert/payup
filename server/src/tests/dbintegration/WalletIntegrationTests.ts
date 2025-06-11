import prisma, {resetDatabase} from "../testUtils";
import {beforeEach} from "@jest/globals";
import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {Wallet} from "../../domain/adapter/Wallet";
import {PrismaUserRepository} from "../../repository/adapter/prisma/PrismaUserRepository";
import {User} from "../../domain/adapter/User";
import {userRepository as sharedUserRepository} from "../testUtils";
import {walletRepository as sharedWalletRepository} from "../testUtils";


describe ('Wallet integration tests', () => {

    beforeAll(async () => {
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    let walletRepository: IWalletRepository;
    let userRepository: PrismaUserRepository;
    let createdUserCvu: number;
    let testWallet: Wallet;

    beforeEach(async () => {
        await resetDatabase();
        walletRepository = sharedWalletRepository; // Reinitialize the wallet repository
        userRepository = sharedUserRepository; // Reinitialize the user repository
        let testUser = new User('John Doe', 'john2@example.com', 'securepassword', 654321);
        await userRepository.save(testUser);
        let createdUser = await userRepository.findByEmail(testUser.email);
        if (!createdUser) {
            throw new Error('User should have been created but was not found');
        }
        else {
            createdUserCvu = createdUser.cvu;
        }
        testWallet = new Wallet(createdUserCvu, 0); // Initialize a wallet with the user's CVU
        await walletRepository.save(testWallet);
    });

    it('should find a wallet by userCvu', async () => {

        const foundWallet = await walletRepository.findByUserCvu(createdUserCvu);

        expect(foundWallet).not.toBeNull();
        expect(foundWallet?.userCvu).toBe(createdUserCvu);
        expect(foundWallet?.balance).toBe(0);
    });

    it ('should return null when finding by non-existent userCvu', async () => {
        const foundWallet = await walletRepository.findByUserCvu(999);

        expect(foundWallet).toBeNull();
    });

    it ('should update an existing wallet', async () => {

        const updatedWallet = new Wallet(createdUserCvu, 200);
        await walletRepository.update(updatedWallet);

        const foundWallet = await walletRepository.findByUserCvu(createdUserCvu);

        expect(foundWallet).not.toBeNull();
        expect(foundWallet?.userCvu).toBe(updatedWallet.userCvu);
        expect(foundWallet?.balance).toBe(updatedWallet.balance);
    });
});
