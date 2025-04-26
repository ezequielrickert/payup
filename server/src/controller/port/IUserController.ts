import {UserDto} from "../../dto/UserDto";

export interface IUserController {
    getUserById(id: string): Promise<UserDto | null>;
    createUser(user: UserDto): Promise<void>;
    getUserByEmail(email: string): Promise<UserDto | null>;
}
