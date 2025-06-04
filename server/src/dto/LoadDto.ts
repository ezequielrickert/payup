export class LoadDto {
    cvu: number;
    amount: number;

    constructor(cvu: number, amount: number) {
        this.cvu = cvu;
        this.amount = amount;
    }
}