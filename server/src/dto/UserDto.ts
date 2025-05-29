export class UserDto {
    name: string;
    email: string;
    password: string;
    cvu: number | undefined;


    constructor(name: string, email: string, password: string, cvu?: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cvu = cvu;
    }
}