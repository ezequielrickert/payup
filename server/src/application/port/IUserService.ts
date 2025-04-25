import {IUser} from "../../domain/port/IUser";

export interface IUserService {
    findById(id: string): Promise<IUser | null>;
    save(user: IUser): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
}