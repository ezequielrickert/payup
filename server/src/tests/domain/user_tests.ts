import { describe, it } from 'node:test';
import assert from "node:assert";
import { User } from '../../domain/adapter/User';

describe('User entity', () => {

    it('should create a valid adapter', () => {
        const id = 'adapter-123';
        const name = 'John Doe';
        const email = 'john@example.com';

        const user = new User(id, name, email);

        assert.strictEqual(user.id, id);
        assert.strictEqual(user.name, name);
        assert.strictEqual(user.email, email);
    });

    it('should throw an error when email is invalid', () => {
        const id = 'adapter-123';
        const name = 'John Doe';
        const invalidEmail = 'invalid-email';

        assert.throws(() => {
            new User(id, name, invalidEmail);
        }, /Invalid email address/);
    });
});