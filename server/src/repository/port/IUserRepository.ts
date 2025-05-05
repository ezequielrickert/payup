import { IUser } from '../../domain/port/IUser';

export interface IUserRepository {
    findById(id: string): Promise<IUser | null>;
    save(user: IUser): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
}
