import {IUserService} from "../port/IUserService";
import {IUser} from "../../domain/port/IUser";
import {IUserRepository} from "../../repository/port/IUserRepository";
import {User} from "../../domain/adapter/User";

export class UserService implements IUserService {

    // Note1: Here we are using the interface IUserRepository
    // because we CAN NOT couple application layer to INFRASTRUCTURE models like Prisma
    constructor(private readonly userRepo: IUserRepository) {}

    // La idea es que application reciba dto y envie dto
    // Dentro del service lo transforma al de dominio
    async findById(id: string): Promise<IUser | null> {
        return this.userRepo.findById(id);
    }

    async save(user: IUser): Promise<void> {
        // Validate and create domain object from interface
        // Note2: Here we can couple to the actual implementation because the application layer CAN USE DOMAIN Entities
        const domainUser = new User(user.id, user.name, user.email);
        await this.userRepo.save(domainUser);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.userRepo.findByEmail(email);
    }
}
