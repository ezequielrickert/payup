import {beforeEach, describe, it} from 'node:test';
import assert from "node:assert";
import { User } from '../../domain/adapter/User';
import { InMemoryUserRepository } from '../adapters/InMemoryUserRepository';
import {IUserRepository} from "../../repository/port/IUserRepository";
import {IUser} from "../../domain/port/IUser";

describe('UserRepository', () => {
    let userRepository: IUserRepository;
    let testUser: IUser;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        testUser = new User('John Doe', 'john@example.com');
    });

    it('should save and find a adapter by id', async () => {
        await userRepository.save(testUser);

        const foundUser = await userRepository.findById('1');

        assert.notStrictEqual(foundUser, null);
        assert.strictEqual(foundUser?.name, testUser.name);
        assert.strictEqual(foundUser?.email, testUser.email);
    });

    it('should return null when finding by non-existent id', async () => {
        const foundUser = await userRepository.findById('non-existent-id');

        assert.strictEqual(foundUser, null);
    });

    it('should find a adapter by email', async () => {
        await userRepository.save(testUser);

        const foundUser = await userRepository.findByEmail(testUser.email);

        assert.notStrictEqual(foundUser, null);
        assert.strictEqual(foundUser?.name, testUser.name);
    });

    it('should return null when finding by non-existent email', async () => {
        const foundUser = await userRepository.findByEmail('non-existent@example.com');

        assert.strictEqual(foundUser, null);
    });
});