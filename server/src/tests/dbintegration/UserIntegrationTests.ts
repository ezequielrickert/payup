import prisma, {resetDatabase} from "../testUtils";
import {beforeEach, expect, it} from "@jest/globals";
import {IUserRepository} from "../../repository/port/IUserRepository";
import {IUser} from "../../domain/port/IUser";
import {User} from "../../domain/adapter/User";
import {PrismaUserRepository} from "../../repository/adapter/prisma/PrismaUserRepository";

describe('User integration tests', () => {
    beforeAll(async () => {
        // Optionally, run migrations or db push here if needed
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });


    let userRepository: IUserRepository;
    let testUser: IUser;

    beforeEach(async () => {
        await resetDatabase();
        userRepository = new PrismaUserRepository(prisma);
        testUser = new User('John Doe', 'john@example.com', 'securepassword', 1234567890);
    });

    it('should save and find a user by email', async () => {
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