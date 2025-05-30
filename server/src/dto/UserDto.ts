export class UserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    cvu: number | undefined;

    constructor(id: number, name: string, email: string, password: string, cvu?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cvu = cvu;
    }
}

