import { beforeEach, describe, it, expect } from '@jest/globals';
import { User } from '../../domain/adapter/User';
import { InMemoryUserRepository } from '../adapters/InMemoryUserRepository';
import { IUserRepository } from '../../repository/port/IUserRepository';
import { IUser } from '../../domain/port/IUser';

describe('UserRepository', () => {
    let userRepository: IUserRepository;
    let testUser: IUser;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        testUser = new User('John Doe', 'john@example.com', 'securepassword', 1234567890);
    });

    it('should save and find a user by id', async () => {
        await userRepository.save(testUser);

        const foundUser = await userRepository.findById('1');

        expect(foundUser).not.toBeNull();
        expect(foundUser?.name).toBe(testUser.name);
        expect(foundUser?.email).toBe(testUser.email);
    });

    it('should return null when finding by non-existent id', async () => {
        const foundUser = await userRepository.findById('non-existent-id');

        expect(foundUser).toBeNull();
    });

    it('should find a user by email', async () => {
        await userRepository.save(testUser);

        const foundUser = await userRepository.findByEmail(testUser.email);

        expect(foundUser).not.toBeNull();
        expect(foundUser?.name).toBe(testUser.name);
    });

    it('should return null when finding by non-existent email', async () => {
        const foundUser = await userRepository.findByEmail('non-existent@example.com');

        expect(foundUser).toBeNull();
    });
});