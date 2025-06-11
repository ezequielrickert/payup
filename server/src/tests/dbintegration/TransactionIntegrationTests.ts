import prisma, {resetDatabase, createUserRepository, createWalletRepository, createTransactionRepository} from "../testUtils";
import {beforeEach} from "@jest/globals";
import {IWalletRepository} from "../../repository/port/IWalletRepository";
import {Wallet} from "../../domain/adapter/Wallet";
import {PrismaUserRepository} from "../../repository/adapter/prisma/PrismaUserRepository";
import {User} from "../../domain/adapter/User";
import {PrismaTransactionRepository} from "../../repository/adapter/prisma/PrismaTransactionRepository";


describe('Transaction integration tests', () => {
    beforeAll(async () => {
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    let walletRepository: IWalletRepository;
    let userRepository: PrismaUserRepository;
    let transactionRepository: PrismaTransactionRepository;
    let bobCvu: number;
    let aliceCvu: number;

    beforeEach(async () => {
        await resetDatabase();
        walletRepository = createWalletRepository();
        userRepository = createUserRepository();
        transactionRepository = createTransactionRepository();
        let testUser1 = new User('Bob', 'bob@example.com', 'securepassword', 847123);
        let testUser2 = new User('Alice', 'alice@example.com', 'securepassword', 133679);

        await userRepository.save(testUser1);
        await userRepository.save(testUser2);

        let bob = await userRepository.findByEmail(testUser1.email);
        let alice = await userRepository.findByEmail(testUser2.email);
        if (!bob || !alice) {
            throw new Error('Users should have been created but where not found');
        }
        else {
            bobCvu = bob.cvu;
            aliceCvu = alice.cvu;
        }
        let bobWallet = new Wallet(bobCvu, 100); // Initialize a wallet with the user's CVU
        let aliceWallet = new Wallet(aliceCvu, 500); // Initialize a wallet with the user's CVU
        await walletRepository.save(bobWallet);
        await walletRepository.save(aliceWallet);
    });

    it('should create a transaction and retrieve it for sender', async () => {
        const transaction = await transactionRepository.createTransaction(100, aliceCvu, bobCvu, 'Test payment');
        const transactions = await transactionRepository.getUserTransactions(aliceCvu);
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toEqual(transaction);
    });

    it('should create a transaction and retrieve it for receiver', async () => {
        const transaction = await transactionRepository.createTransaction(200, aliceCvu, bobCvu, 'Receiver test');
        const transactions = await transactionRepository.getUserTransactions(bobCvu);
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toEqual(transaction);
    });

    it('should return an empty array if user has no transactions', async () => {
        const transactions = await transactionRepository.getUserTransactions(99999);
        expect(transactions).toEqual([]);
    });

    it('should store multiple transactions and filter by user', async () => {
        await transactionRepository.createTransaction(50, aliceCvu, bobCvu, 'A');
        await transactionRepository.createTransaction(75, aliceCvu, bobCvu, 'B');
        await transactionRepository.createTransaction(100, bobCvu, aliceCvu, 'C');
        const bobTxs = await transactionRepository.getUserTransactions(bobCvu);
        expect(bobTxs).toHaveLength(3);
        const aliceTsx = await transactionRepository.getUserTransactions(aliceCvu);
        expect(aliceTsx).toHaveLength(3);
    });


});
