import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, Transaction } from '../types/types';

// Mock data for initial development
const mockUser: User = {
    email: '',
    password: '',
    name: 'Usuario de Prueba',
    cvu: undefined
};

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'income',
        amount: 25000,
        date: new Date().toISOString(),
        description: 'Depósito inicial'
    },
    {
        id: '2',
        type: 'transfer_out',
        amount: 5000,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        description: 'Transferencia a Juan',
        toUser: 'juan@email.com'
    },
    {
        id: '3',
        type: 'expense',
        amount: 2000,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Extracción ATM'
    }
];

interface AppContextType {
    // Auth
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
    
    // User
    user: User | null;
    
    // Transactions
    transactions: Transaction[];
    
    // Balance visibility
    showBalance: boolean;
    toggleBalance: () => void;
    
    // Actions
    loadMoney: (amount: number, method: 'card' | 'bank' | 'debin') => Promise<void>;
    transfer: (recipient: string, amount: number, description: string) => Promise<void>;
    withdraw: (amount: number, bankAccount: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development
    const [user, setUser] = useState<User | null>(mockUser);
    
    // App state
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [showBalance, setShowBalance] = useState(true);

    // Auth actions
    const login = async (email: string, password: string) => {
        // TODO: Implement real authentication
        setIsAuthenticated(true);
        setUser(mockUser);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const register = async (email: string, password: string) => {
        // TODO: Implement real registration
        setIsAuthenticated(true);
        setUser(mockUser);
    };

    // Balance visibility
    const toggleBalance = () => {
        setShowBalance(prev => !prev);
    };

    // Money actions
    const loadMoney = async (amount: number, method: 'card' | 'bank' | 'debin') => {
        // TODO: Implement real API call
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'income',
            amount,
            date: new Date().toISOString(),
            description: `Carga de dinero vía ${
                method === 'card' ? 'tarjeta' :
                method === 'bank' ? 'transferencia bancaria' :
                'DEBIN'
            }`
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setUser(prev => prev ? {
            ...prev,
        } : null);
    };

    const transfer = async (recipient: string, amount: number, description: string) => {
        // TODO: Implement real API call
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'transfer_out',
            amount,
            date: new Date().toISOString(),
            description: description || 'Transferencia',
            toUser: recipient
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setUser(prev => prev ? {
            ...prev,
        } : null);
    };

    const withdraw = async (amount: number, bankAccount: string) => {
        // TODO: Implement real API call
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'expense',
            amount,
            date: new Date().toISOString(),
            description: `Extracción a cuenta ${bankAccount}`
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setUser(prev => prev ? {
            ...prev,
        } : null);
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        register,
        user,
        transactions,
        showBalance,
        toggleBalance,
        loadMoney,
        transfer,
        withdraw
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}; 

export default AppProvider;