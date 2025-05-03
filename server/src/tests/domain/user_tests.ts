import { describe, it } from 'node:test';
import assert from "node:assert";
import { User } from '../../domain/adapter/User';

describe('User entity', () => {

    it('should create a valid adapter', () => {
        const name = 'John Doe';
        const email = 'john@example.com';

        const user = new User(name, email);

        assert.strictEqual(user.name, name);
        assert.strictEqual(user.email, email);
    });

    it('should throw an error when email is invalid', () => {
        const id = 'adapter-123';
        const name = 'John Doe';
        const invalidEmail = 'invalid-email';

        assert.throws(() => {
            new User(name, invalidEmail);
        }, /Invalid email address/);
    });
});