import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserService } from '../../application/adapter/UserService';
import { InMemoryUserRepository } from '../adapters/InMemoryUserRepository';
import { FakeWalletService } from '../adapters/FakeWalletService';
import { UserDto } from '../../dto/UserDto';

// This test verifies that when a user is created, a wallet is also created for that user

describe('User and Wallet Integration', () => {
    let userRepo: InMemoryUserRepository;
    let walletService: FakeWalletService;
    let userService: UserService;

    beforeEach(() => {
        userRepo = new InMemoryUserRepository();
        walletService = new FakeWalletService();
        userService = new UserService(userRepo, walletService);
    });

    it('should create a wallet when a new user is created', async () => {
        const user = new UserDto('Test User', 'testuser@example.com', 'password123');
        await userService.save(user);
        // Find the user to get the assigned id (cvu)
        const savedUser = await userRepo.findByEmail('testuser@example.com');
        expect(savedUser).not.toBeNull();
        // Wallet should be created with the user's cvu as userId
        const wallet = await walletService.findByUserCvu(savedUser!.cvu);
        expect(wallet).not.toBeNull();
        expect(wallet?.userCvu).toBe(savedUser!.cvu);
        expect(wallet?.balance).toBe(0);
    });

    it('should not create a wallet if user creation fails (duplicate email)', async () => {
        const user = new UserDto('Test User', 'testuser@example.com', 'password123');
        await userService.save(user);
        // Try to create the same user again
        await expect(userService.save(user)).rejects.toThrow();
        // Only one wallet should exist
        const savedUser = await userRepo.findByEmail('testuser@example.com');
        const wallet = await walletService.findByUserCvu(savedUser!.cvu);
        expect(walletService.wallets.length).toBe(1);
        expect(wallet).not.toBeNull();
    });
});

