import { IUser } from '../../domain/port/IUser';
import { IUserRepository } from '../../repository/port/IUserRepository';

// In-memory implementation of UserRepository for testing
export class InMemoryUserRepository implements IUserRepository {
    private users: Map<string, IUser> = new Map();

    private id: number = 0;

    async findById(id: string): Promise<IUser | null> {
        return this.users.get(id) || null;
    }

    async save(user: IUser): Promise<void> {
        this.users.set((this.id + 1).toString(), user);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }
}