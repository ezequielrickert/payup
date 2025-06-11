import {UserDto} from "../../dto/UserDto";
import {TransactionDto} from "../../dto/TransactionDto";

export interface IUserService {
    save(user: UserDto): Promise<void>;
    findByEmail(email: string): Promise<UserDto | null>;
    authenticate(email: string, password: string): Promise<UserDto | null>;
    getUserTransactions(email: string): Promise<TransactionDto[]>;
}
