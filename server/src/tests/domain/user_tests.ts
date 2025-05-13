// User.test.ts
import { describe, it, expect } from '@jest/globals';
import { User } from '../../domain/adapter/User';

describe('User entity', () => {

    it('should create a valid adapter', () => {
        const name = 'John Doe';
        const email = 'john@example.com';

        const user = new User(name, email);

        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    });

    it('should throw an error when email is invalid', () => {
        const name = 'John Doe';
        const invalidEmail = 'invalid-email';

        expect(() => {
            new User(name, invalidEmail);
        }).toThrow(/Invalid email address/);
    });
});
