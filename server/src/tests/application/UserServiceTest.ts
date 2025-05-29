import { describe, it, expect } from '@jest/globals';
import { InMemoryUserRepository } from '../adapters/InMemoryUserRepository';
import { UserService } from '../../application/adapter/UserService';
import {UserDto} from "../../dto/UserDto";
import {FakeWalletService} from "../adapters/FakeWalletService";

describe('UserService', () => {

    it('should save and find user by id', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@example.com', "securepassword");

        await service.save(user);
        const found = await service.findById('1');

        expect(found?.email).toBe('alice@example.com');
        expect(typeof found?.cvu).toBe('number');
        expect(found?.cvu).toBeGreaterThanOrEqual(100000);
        expect(found?.cvu).toBeLessThanOrEqual(999999);
    });

    it('should find user by email', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@example.com', "securepassword");

        await service.save(user);
        const found = await service.findByEmail('alice@example.com');

        expect(found?.email).toBe('alice@example.com');
    });

    it('should return null for non-existing user id', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const found = await service.findById('999');

        expect(found).toBeNull();
    });

    it('should return null for non-existing email', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const found = await service.findByEmail('jhon@email.com');

        expect(found).toBeNull();
    });

    it('should not save user with existing email', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user1 = new UserDto('Alice', 'alice@example.com', "securepassword");
        const user2 = new UserDto('Bob', 'alice@example.com', "securepassword");

        await service.save(user1);

        await expect(service.save(user2)).rejects.toThrow(`User with email ${user2.email} already exists`);
    });

});