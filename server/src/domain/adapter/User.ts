import { IUser } from '../port/IUser';

export class User implements IUser {
    id: string;
    name: string;
    email: string;

    constructor(
        id: string,
        name: string,
        email: string,
    ) {
        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }

        this.id = id;
        this.name = name;
        this.email = email;
    }
}