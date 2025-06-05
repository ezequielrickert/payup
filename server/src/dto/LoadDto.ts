export class LoadDto {
    email: string;
    cvu: number;
    amount: number;

    constructor(email: string, cvu: number, amount: number) {
        this.email = email;
        this.cvu = cvu;
        this.amount = amount;
    }
}