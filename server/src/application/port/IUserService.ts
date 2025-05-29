import {UserDto} from "../../dto/UserDto";

export interface IUserService {
    findById(id: string): Promise<UserDto | null>;
    save(user: UserDto): Promise<void>;
    findByEmail(email: string): Promise<UserDto | null>;
}
