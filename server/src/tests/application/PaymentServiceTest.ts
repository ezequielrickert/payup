import { describe, it, expect } from '@jest/globals';
import { PaymentService } from '../../application/adapter/PaymentService';
import { FakeWalletService } from '../adapters/FakeWalletService';
import { FakeTransactionService } from '../adapters/FakeTransactionService';

// Helper to create users and wallets before each test
async function setupUsers(walletService: FakeWalletService, senderCvu: number, receiverCvu: number, senderInitialBalance = 0, receiverInitialBalance = 0) {
    await walletService.createWallet(senderCvu, senderInitialBalance);
    await walletService.createWallet(receiverCvu, receiverInitialBalance);
}

describe('PaymentService', () => {
    it('should transfer money and create a transaction', async () => {
        const walletService = new FakeWalletService();
        const transactionService = new FakeTransactionService();
        const paymentService = new PaymentService(walletService, transactionService);

        // Setup: create users and give sender some balance
        await setupUsers(walletService, 111111, 222222, 500, 0);
        // Transfer
        const result = await paymentService.transfer(111111, 222222, 100, 'Test payment');
        expect(result.amount).toBe(100);
        expect(result.senderCvu).toBe(111111);
        expect(result.receiverCvu).toBe(222222);
        expect(result.description).toBe('Test payment');
        // Check balances
        const senderWallet = await walletService.findByUserCvu(111111);
        const receiverWallet = await walletService.findByUserCvu(222222);
        expect(senderWallet).not.toBeNull();
        expect(receiverWallet).not.toBeNull();
        if (senderWallet && receiverWallet) {
            expect(senderWallet.balance).toBe(400);
            expect(receiverWallet.balance).toBe(100);
        }
    });

    it('should throw if sender has insufficient funds', async () => {
        const walletService = new FakeWalletService();
        const transactionService = new FakeTransactionService();
        const paymentService = new PaymentService(walletService, transactionService);
        await setupUsers(walletService, 111111, 222222, 50, 0);
        await expect(paymentService.transfer(111111, 222222, 100, 'Should fail')).rejects.toThrow();
    });

    it('should allow multiple transfers and keep balances correct', async () => {
        const walletService = new FakeWalletService();
        const transactionService = new FakeTransactionService();
        const paymentService = new PaymentService(walletService, transactionService);
        await setupUsers(walletService, 111111, 222222, 1000, 0);
        await paymentService.transfer(111111, 222222, 200, 'First');
        await paymentService.transfer(111111, 222222, 300, 'Second');
        const senderWallet = await walletService.findByUserCvu(111111);
        const receiverWallet = await walletService.findByUserCvu(222222);
        expect(senderWallet).not.toBeNull();
        expect(receiverWallet).not.toBeNull();
        if (senderWallet && receiverWallet) {
            expect(senderWallet.balance).toBe(500);
            expect(receiverWallet.balance).toBe(500);
        }
    });
});

