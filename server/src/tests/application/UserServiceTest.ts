import {describe, it} from "node:test";
import {InMemoryUserRepository} from "../adapters/InMemoryUserRepository";
import {UserService} from "../../application/adapter/UserService";
import {User} from "../../domain/adapter/User";
import assert from "node:assert";

describe('UserService', () => {

    it('should save and find user', async () => {
        const repo = new InMemoryUserRepository();
        const service = new UserService(repo);

        const user = new User('1', 'Alice', 'alice@example.com');

        await service.save(user);
        const found = await service.findById('1');

        assert.strictEqual(found?.email, 'alice@example.com');
    });
});