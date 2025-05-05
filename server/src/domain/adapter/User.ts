import { IUser } from '../port/IUser';

export class User implements IUser {
    name: string;
    email: string;

    constructor(
        name: string,
        email: string,
    ) {
        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }

        this.name = name;
        this.email = email;
    }
}