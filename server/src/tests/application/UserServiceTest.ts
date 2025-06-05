import { describe, it, expect } from '@jest/globals';
import { InMemoryUserRepository } from '../adapters/InMemoryUserRepository';
import { UserService } from '../../application/adapter/UserService';
import {UserDto} from "../../dto/UserDto";
import {FakeWalletService} from "../adapters/FakeWalletService";

describe('UserService', () => {


    it('should find user by email', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@example.com', "securepassword");

        await service.save(user);
        const found = await service.findByEmail('alice@example.com');

        expect(found?.email).toBe('alice@example.com');
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

    it('should authenticate a user with correct credentials', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@mail.com', 'securepassword');
        await service.save(user);
        const authenticatedUser = await service.authenticate('alice@mail.com', 'securepassword');
        expect(authenticatedUser?.name).toBe('Alice');
        expect(authenticatedUser?.email).toBe('alice@mail.com');
        expect(authenticatedUser?.password).toBe('securepassword');
        expect(typeof authenticatedUser?.cvu).toBe('number');
        expect(authenticatedUser?.cvu).not.toBeNull();
        expect(authenticatedUser?.cvu).not.toBeUndefined();
        });

    it('should not authenticate a user with incorrect credentials', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);
        const user = new UserDto('Alice', 'alice@mail.com', 'securepassword');
        await service.save(user);

        const authenticatedUser = await service.authenticate('bob@mail.com', 'securepassword2');
        expect(authenticatedUser).toBeNull();
    });

    it('should not authenticate a user with correct email but wrong password', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@mail.com', 'securepassword');
        await service.save(user);

        const authenticatedUser = await service.authenticate('alice@mail.com', 'wrongpassword');
        expect(authenticatedUser).toBeNull();
    });

    it('should not authenticate a user with non-existing email and correct password', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@mail.com', 'securepassword');
        await service.save(user);

        const authenticatedUser = await service.authenticate('nonexistent@mail.com', 'securepassword');
        expect(authenticatedUser).toBeNull();
    });

    it('should not authenticate a user with wrong email and correct password', async () => {
        const repo = new InMemoryUserRepository();
        const walletService = new FakeWalletService();
        const service = new UserService(repo, walletService);

        const user = new UserDto('Alice', 'alice@mail.com', 'securepassword');
        await service.save(user);

        const authenticatedUser = await service.authenticate('wrongemail@mail.com', 'securepassword');
        expect(authenticatedUser).toBeNull();
    });

});