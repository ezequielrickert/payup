import { IUser } from '../port/IUser';

export class User implements IUser {
    name: string;
    email: string;
    password: string;
    cvu: number;

    constructor(
        name: string,
        email: string,
        password: string,
        cvu: number
    ) {
        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }

        this.name = name;
        this.email = email;
        this.password = password;
        this.cvu = cvu;
    }
}