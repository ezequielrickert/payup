import React from 'react';
import {
    CreditCard,
    Plus,
    Send,
    Minus,
    History,
    Eye,
    EyeOff,
    ArrowDownLeft,
    ArrowUpRight
} from 'lucide-react';
import { User, Transaction } from '../../types/types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Header } from '../ui/Header';

interface DashboardScreenProps {
    user: User;
    transactions: Transaction[];
    showBalance: boolean;
    onToggleBalance: () => void;
    onNavigate: (screen: string) => void;
    onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
                                                                    user,
                                                                    transactions,
                                                                    showBalance,
                                                                    onToggleBalance,
                                                                    onNavigate,
                                                                    onLogout
                                                                }) => {
    return (
        <div className="screen-container">
            <Header
                title="Mi Billetera"
                showUser
                onUserClick={onLogout}
            />

            <div className="screen-content space-y-6">
                {/* Tarjeta de Saldo */}
                <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-primary-100 text-sm font-medium">Saldo disponible</p>
                            <div className="flex items-center mt-2">
                                {showBalance ? (
                                    <span className="text-3xl font-bold">
                    {formatCurrency(user.balance)}
                  </span>
                                ) : (
                                    <span className="text-3xl font-bold">••••••</span>
                                )}
                                <button
                                    onClick={onToggleBalance}
                                    className="ml-3 text-primary-100 hover:text-white transition-colors duration-200"
                                >
                                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <CreditCard className="w-8 h-8 text-primary-200" />
                    </div>
                    <p className="text-primary-100 text-sm font-medium">{user.email}</p>
                </div>

                {/* Acciones Rápidas */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => onNavigate('load')}
                        className="card hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                        onClick={() => onNavigate('transfer')}
                        className="card hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                        onClick={() => onNavigate('withdraw')}
                        className="card hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                        onClick={() => onNavigate('history')}
                        className="card hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                <div className="card">
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Últimos movimientos</h3>
                    {transactions.length > 0 ? (
                        <div className="space-y-4">
                            {transactions.slice(0, 3).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <div className="flex items-center">
                                        <div className={`p-2 rounded-full mr-4 ${
                                            transaction.type === 'income' ? 'bg-green-100' :
                                                transaction.type === 'expense' ? 'bg-red-100' :
                                                    transaction.type === 'transfer_out' ? 'bg-blue-100' : 'bg-purple-100'
                                        }`}>
                                            {transaction.type === 'income' ?
                                                <ArrowDownLeft className="w-4 h-4 text-green-600" /> :
                                                transaction.type === 'expense' ?
                                                    <ArrowUpRight className="w-4 h-4 text-red-600" /> :
                                                    <Send className="w-4 h-4 text-blue-600" />
                                            }
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

                            {transactions.length > 3 && (
                                <button
                                    onClick={() => onNavigate('history')}
                                    className="w-full text-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200 mt-3"
                                >
                                    Ver todos los movimientos
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No hay movimientos aún</p>
                            <p className="text-sm text-gray-400 mt-1">Comenzá cargando dinero a tu billetera</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};