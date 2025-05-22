export class UserDto {
    name: string;
    email: string;
    password: string;
// todo revisar si esta bien password
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}