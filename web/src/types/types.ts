export interface Transaction {
    id: string;
    type: 'income' | 'expense' | 'transfer_in' | 'transfer_out';
    amount: number;
    description: string;
    date: string;
    fromUser?: string;
    toUser?: string;
}

export interface User {
    name: string,
    email: string;
    password: string;
    cvu: number | undefined;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface TransferForm {
    recipient: string;
    amount: string;
    description: string;
}

export interface LoadForm {
    amount: string;
}

export interface WithdrawForm {
    amount: string;
    bankAccount: string;
}

export interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}