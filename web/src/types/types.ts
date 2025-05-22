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
    id: string;
    email: string;
    balance: number;
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
    method: 'card' | 'bank' | 'debin';
}

export interface WithdrawForm {
    amount: string;
    bankAccount: string;
}

export type ViewType = 'login' | 'register' | 'dashboard' | 'transfer' | 'load' | 'withdraw' | 'history';

export interface AppState {
    currentView: ViewType;
    user: User | null;
    transactions: Transaction[];
    showBalance: boolean;
}

export interface SignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
}