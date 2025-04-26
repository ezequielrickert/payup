import {IUserController} from "../port/IUserController";
import {UserDto} from "../../dto/UserDto";
import {IUserService} from "../../application/port/IUserService";
import {User} from "../../domain/adapter/User";

export class UserController implements IUserController {

    constructor(private userService: IUserService) {
        this.userService = userService;
    }

    getUserById(id: string): Promise<UserDto | null> {
        return this.userService.findById(id)
    }

    createUser(user: UserDto): Promise<void> {
        const domainUser = this.fromDto(user);
        return this.userService.save(domainUser);
    }

    getUserByEmail(email: string): Promise<UserDto | null> {
        return this.userService.findByEmail(email)
    }

    fromDto(userDto: UserDto): User {
        return new User("1", userDto.name, userDto.email);
    }
}