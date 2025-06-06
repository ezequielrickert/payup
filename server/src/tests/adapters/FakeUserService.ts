import {UserDto} from "../../dto/UserDto";
import {IUserService} from "../../application/port/IUserService";
import { TransactionDto } from "../../dto/TransactionDto";

export class FakeUserService implements IUserService {

    getUserTransactions(email: string): Promise<TransactionDto[]> {
        return Promise.resolve([]);
    }

    usersList: UserDto[] = [];

    authenticate(email: string, password: string): Promise<UserDto | null> {
        const user = this.usersList.find(user => user.email === email) || null;
        if (user && user.password === password) {
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        const user = this.usersList.find(user => user.email === email) || null;
        return Promise.resolve(user);
    }

    async save(user: UserDto): Promise<void> {
        if (this.usersList.some(existingUser => existingUser.email === user.email)) {
            throw new Error("User already exists");
        }
        this.usersList.push(user);
    }


}
