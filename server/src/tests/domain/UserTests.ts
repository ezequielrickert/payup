import { describe, it, expect } from '@jest/globals';
import { User } from '../../domain/adapter/User';

describe('User entity', () => {

    it('should create a valid user', () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'securepassword';
        const cvu = 1234567890;

        const user = new User(name, email, password, cvu);

        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.password).toBe("securepassword");
        expect(user.cvu).toBe(cvu);
    });

    it('should throw an error when email is invalid', () => {
        const name = 'John Doe';
        const invalidEmail = 'invalid-email';

        expect(() => {
            new User(name, invalidEmail, "securepassword", 1234567890);
        }).toThrow(/Invalid email address/);
    });
});
