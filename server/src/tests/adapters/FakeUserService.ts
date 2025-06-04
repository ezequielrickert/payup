import {UserDto} from "../../dto/UserDto";
import {IUserService} from "../../application/port/IUserService";

export class FakeUserService implements IUserService {

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

    async findById(id: string): Promise<UserDto | null> {
        if (!this.usersList.length) {
            return Promise.resolve(null);
        }
        return Promise.resolve(this.usersList[0]);
    }

    async save(user: UserDto): Promise<void> {
        if (this.usersList.some(existingUser => existingUser.email === user.email)) {
            throw new Error("User already exists");
        }
        this.usersList.push(user);
    }
}