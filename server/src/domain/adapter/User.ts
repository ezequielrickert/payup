import { IUser } from '../port/IUser';

export class User implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    cvu: number;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        cvu: number
    ) {
        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cvu = cvu;
    }
}

