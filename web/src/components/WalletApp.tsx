import React, { useState } from 'react';
import {
    User,
    CreditCard,
    Send,
    ArrowUpRight,
    ArrowDownLeft,
    History,
    Eye,
    EyeOff,
    Plus,
    Minus,
    ChevronLeft,
    Mail,
    Lock,
    DollarSign,
    Building2,
    Smartphone
} from 'lucide-react';
import { User as UserType, Transaction } from '../types/types';

function WalletApp() {
    const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'transfer' | 'load' | 'withdraw' | 'history'>('login');
    const [user, setUser] = useState<UserType | null>(null);
    const [showBalance, setShowBalance] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: '1',
            type: 'income',
            amount: 10000,
            description: 'Carga inicial desde tarjeta',
            date: '2025-05-22T10:00:00Z'
        },
        {
            id: '2',
            type: 'transfer_out',
            amount: 2500,
            description: 'Transferencia a juan@email.com',
            date: '2025-05-22T11:30:00Z',
            toUser: 'juan@email.com'
        }
    ]);

    // Estados para formularios
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [transferForm, setTransferForm] = useState({ recipient: '', amount: '', description: '' });
    const [loadForm, setLoadForm] = useState({ amount: '', method: 'card' });
    const [withdrawForm, setWithdrawForm] = useState({ amount: '', bankAccount: '' });

    // Simular login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.email && loginForm.password) {
            setUser({
                id: '1',
                email: loginForm.email,
                balance: 15500
            });
            setCurrentView('dashboard');
        }
    };

    // Simular registro
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (registerForm.email && registerForm.password === registerForm.confirmPassword) {
            setUser({
                id: '1',
                email: registerForm.email,
                balance: 0
            });
            setCurrentView('dashboard');
        }
    };

    // Transferir dinero
    const handleTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && transferForm.recipient && transferForm.amount) {
            const amount = parseFloat(transferForm.amount);
            if (amount <= user.balance) {
                const newTransaction: Transaction = {
                    id: Date.now().toString(),
                    type: 'transfer_out',
                    amount: amount,
                    description: transferForm.description || `Transferencia a ${transferForm.recipient}`,
                    date: new Date().toISOString(),
                    toUser: transferForm.recipient
                };

                setTransactions(prev => [newTransaction, ...prev]);
                setUser(prev => prev ? { ...prev, balance: prev.balance - amount } : null);
                setTransferForm({ recipient: '', amount: '', description: '' });
                setCurrentView('dashboard');
            }
        }
    };

    // Cargar dinero
    const handleLoadMoney = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && loadForm.amount) {
            const amount = parseFloat(loadForm.amount);
            const methodText = loadForm.method === 'card' ? 'tarjeta' :
                loadForm.method === 'bank' ? 'cuenta bancaria' : 'DEBIN';

            const newTransaction: Transaction = {
                id: Date.now().toString(),
                type: 'income',
                amount: amount,
                description: `Carga desde ${methodText}`,
                date: new Date().toISOString()
            };

            setTransactions(prev => [newTransaction, ...prev]);
            setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
            setLoadForm({ amount: '', method: 'card' });
            setCurrentView('dashboard');
        }
    };

    // Extraer dinero
    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && withdrawForm.amount && withdrawForm.bankAccount) {
            const amount = parseFloat(withdrawForm.amount);
            if (amount <= user.balance) {
                const newTransaction: Transaction = {
                    id: Date.now().toString(),
                    type: 'expense',
                    amount: amount,
                    description: `Extracción a cuenta ${withdrawForm.bankAccount}`,
                    date: new Date().toISOString()
                };

                setTransactions(prev => [newTransaction, ...prev]);
                setUser(prev => prev ? { ...prev, balance: prev.balance - amount } : null);
                setWithdrawForm({ amount: '', bankAccount: '' });
                setCurrentView('dashboard');
            }
        }
    };

    // Formatear moneda
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    };

    // Formatear fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Pantalla de Login
    if (currentView === 'login') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                    <div className="text-center mb-8">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Mi Billetera</h1>
                        <p className="text-gray-600">Ingresá a tu cuenta</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={loginForm.email}
                                    onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tu contraseña"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ¿No tenés cuenta?{' '}
                            <button
                                onClick={() => setCurrentView('register')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Registrate
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Pantalla de Registro
    if (currentView === 'register') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                    <div className="text-center mb-8">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
                        <p className="text-gray-600">Unite a Mi Billetera</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={registerForm.email}
                                    onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={registerForm.password}
                                    onChange={(e) => setRegisterForm(prev => ({...prev, password: e.target.value}))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tu contraseña"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={registerForm.confirmPassword}
                                    onChange={(e) => setRegisterForm(prev => ({...prev, confirmPassword: e.target.value}))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirmar contraseña"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Crear Cuenta
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ¿Ya tenés cuenta?{' '}
                            <button
                                onClick={() => setCurrentView('login')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Iniciar Sesión
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard Principal
    if (currentView === 'dashboard') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-900">Mi Billetera</h1>
                        <button
                            onClick={() => setUser(null)}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="max-w-md mx-auto p-4 space-y-6">
                    {/* Saldo */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-blue-100 text-sm">Saldo disponible</p>
                                <div className="flex items-center mt-1">
                                    {showBalance ? (
                                        <span className="text-3xl font-bold">
                                            {formatCurrency(user?.balance || 0)}
                                        </span>
                                    ) : (
                                        <span className="text-3xl font-bold">••••••</span>
                                    )}
                                    <button
                                        onClick={() => setShowBalance(!showBalance)}
                                        className="ml-3 text-blue-100 hover:text-white"
                                    >
                                        {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <CreditCard className="w-8 h-8 text-blue-200" />
                        </div>
                        <p className="text-blue-100 text-sm">{user?.email}</p>
                    </div>

                    {/* Acciones Rápidas */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setCurrentView('load')}
                            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-green-100 p-3 rounded-full mb-3">
                                    <Plus className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="font-semibold text-gray-900">Cargar</span>
                                <span className="text-sm text-gray-600">Dinero</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setCurrentView('transfer')}
                            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-3">
                                    <Send className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="font-semibold text-gray-900">Enviar</span>
                                <span className="text-sm text-gray-600">Dinero</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setCurrentView('withdraw')}
                            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-red-100 p-3 rounded-full mb-3">
                                    <Minus className="w-6 h-6 text-red-600" />
                                </div>
                                <span className="font-semibold text-gray-900">Extraer</span>
                                <span className="text-sm text-gray-600">Dinero</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setCurrentView('history')}
                            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-purple-100 p-3 rounded-full mb-3">
                                    <History className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="font-semibold text-gray-900">Historial</span>
                                <span className="text-sm text-gray-600">Movimientos</span>
                            </div>
                        </button>
                    </div>

                    {/* Últimos Movimientos */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <h3 className="font-semibold text-gray-900 mb-4">Últimos movimientos</h3>
                        <div className="space-y-3">
                            {transactions.slice(0, 3).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`p-2 rounded-full mr-3 ${
                                            transaction.type === 'income' ? 'bg-green-100' :
                                            transaction.type === 'expense' ? 'bg-red-100' :
                                            transaction.type === 'transfer_out' ? 'bg-blue-100' : 'bg-purple-100'
                                        }`}>
                                            {transaction.type === 'income' ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> :
                                             transaction.type === 'expense' ? <ArrowUpRight className="w-4 h-4 text-red-600" /> :
                                             <Send className="w-4 h-4 text-blue-600" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">
                                                {transaction.description}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {formatDate(transaction.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`font-semibold ${
                                        transaction.type === 'income' || transaction.type === 'transfer_in'
                                            ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'income' || transaction.type === 'transfer_in' ? '+' : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default WalletApp;