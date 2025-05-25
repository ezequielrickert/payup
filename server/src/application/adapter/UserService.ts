import {IUserService} from "../port/IUserService";
import {IUser} from "../../domain/port/IUser";
import {IUserRepository} from "../../repository/port/IUserRepository";
import {User} from "../../domain/adapter/User";
import {UserDto} from "../../dto/UserDto";

// Note 3: The idea here is that the application layer should recieve and send DTOs with the controller layer.
// Because of this, real instances are created in this layer.
export class UserService implements IUserService {

    // Note1: Here we are using the interface IUserRepository
    // because we CAN NOT couple application layer to INFRASTRUCTURE models like Prisma
    constructor(private readonly userRepo: IUserRepository) {}


    async findById(id: string): Promise<UserDto | null> {
        // Searches for user and, if found, converts it to a DTO and sends it back
        let foundUser = await this.userRepo.findById(id);
        return foundUser ? this.mapToDto(foundUser) : null;
    }

    async save(user: UserDto): Promise<void> {
        // Validate and create domain object from interface
        // Note2: Here we can couple to the actual implementation because the application layer CAN USE DOMAIN Entities
        const existingUser = await this.userRepo.findByEmail(user.email);
        if (existingUser) {
            throw new Error(`User with email ${user.email} already exists`);
        }
        const domainUser = this.mapToDomain(user);
        await this.userRepo.save(domainUser);
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        // Same logic as findById
        let foundUser = await this.userRepo.findByEmail(email);
        return  foundUser ? this.mapToDto(foundUser) : null;
    }

    private mapToDto(user: IUser): UserDto {
        return new UserDto(user.name, user.email, user.password, user.cvu);
    }

    private mapToDomain(user: UserDto): IUser {
        // Add method to create random CVU
        return new User(user.name, user.email, user.password, this.generateRandomCvu());
    }

    private generateRandomCvu(): number {
        // Generate a random CVU number (10 digits)
        return Math.floor(Math.random() * 9000000000) + 1000000000;
    }
}
