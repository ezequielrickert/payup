export interface IUser {
    // No ID included as ORM is the one responsible for generating it
    name: string;
    email: string;
    password: string;
    cvu: number;
}
