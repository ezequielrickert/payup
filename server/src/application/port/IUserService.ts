import {UserDto} from "../../dto/UserDto";

export interface IUserService {
    save(user: UserDto): Promise<void>;
    findByEmail(email: string): Promise<UserDto | null>;
    authenticate(email: string, password: string): Promise<UserDto | null>;
}
