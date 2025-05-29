import { describe, it, expect } from '@jest/globals';
import { InMemoryWalletRepository } from '../adapters/InMemoryWalletRepository';
import { WalletService } from '../../application/adapter/WalletService';
import { WalletDto } from '../../dto/WalletDto';

describe('WalletService', () => {
    it('should create and find wallet by userId', async () => {
        const repo = new InMemoryWalletRepository();
        const service = new WalletService(repo);
        const userId = 1;
        await service.createWallet(userId, 100);
        const found = await service.findByUserId(userId);
        expect(found).not.toBeNull();
        expect(found?.balance).toBe(100);
    });

    it('should deposit and withdraw correctly', async () => {
        const repo = new InMemoryWalletRepository();
        const service = new WalletService(repo);
        const userId = 2;
        await service.createWallet(userId, 50);
        await service.deposit(userId, 25);
        let wallet = await service.findByUserId(userId);
        expect(wallet?.balance).toBe(75);
        await service.withdraw(userId, 30);
        wallet = await service.findByUserId(userId);
        expect(wallet?.balance).toBe(45);
    });

    it('should not create wallet if already exists', async () => {
        const repo = new InMemoryWalletRepository();
        const service = new WalletService(repo);
        const userId = 3;
        await service.createWallet(userId, 10);
        await expect(service.createWallet(userId, 20)).rejects.toThrow();
    });

    it('should throw if deposit/withdraw on non-existing wallet', async () => {
        const repo = new InMemoryWalletRepository();
        const service = new WalletService(repo);
        await expect(service.deposit(99, 10)).rejects.toThrow();
        await expect(service.withdraw(99, 10)).rejects.toThrow();
    });
});

