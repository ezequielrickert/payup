import {createPrismaClient, resetDatabase, createUserRepository, createWalletRepository} from "../testUtils";
import {beforeEach, afterEach} from "@jest/globals";
import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {Wallet} from "../../domain/adapter/Wallet";
import {PrismaUserRepository} from "../../repository/adapter/prisma/PrismaUserRepository";
import {User} from "../../domain/adapter/User";
import { PrismaClient } from "@prisma/client";


describe ('Wallet integration tests', () => {

    let prisma: PrismaClient;
    let walletRepository: IWalletRepository;
    let userRepository: PrismaUserRepository;
    let createdUserCvu: number;
    let testWallet: Wallet;

    beforeEach(async () => {
        prisma = createPrismaClient();
        await resetDatabase(prisma);
        walletRepository = createWalletRepository(prisma);
        userRepository = createUserRepository(prisma);
        let testUser = new User('John Doe', 'john2@example.com', 'securepassword', 654321);
        await userRepository.save(testUser);

        // Retry fetching user up to 5 times with a short delay
        async function fetchUserWithRetry(email: string, retries = 5, delay = 50): Promise<User | null> {
            for (let i = 0; i < retries; i++) {
                const user = await userRepository.findByEmail(email);
                if (user) return user;
                await new Promise(res => setTimeout(res, delay));
            }
            return null;
        }

        let createdUser = await fetchUserWithRetry(testUser.email);
        if (!createdUser) {
            throw new Error('User should have been created but was not found');
        }
        else {
            createdUserCvu = createdUser.cvu;
        }
        testWallet = new Wallet(createdUserCvu, 0); // Initialize a wallet with the user's CVU
        await walletRepository.save(testWallet);
    });

    afterEach(async () => {
        await prisma.$disconnect();
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
