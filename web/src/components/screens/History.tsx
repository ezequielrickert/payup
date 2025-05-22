import React, { useState } from 'react';
import {
    History,
    ArrowDownLeft,
    ArrowUpRight,
    Send,
    Filter,
    Calendar
} from 'lucide-react';
import { Transaction } from '../../types/types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Header } from '../ui/Header';

interface HistoryScreenProps {
    transactions: Transaction[];
    onBack: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
                                                                transactions,
                                                                onBack
                                                            }) => {
    const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'transfers'>('all');

    const filteredTransactions = transactions.filter(transaction => {
        switch (filter) {
            case 'income':
                return transaction.type === 'income';
            case 'expense':
                return transaction.type === 'expense';
            case 'transfers':
                return transaction.type === 'transfer_out' || transaction.type === 'transfer_in';
            default:
                return true;
        }
    });

    const getTransactionIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'income':
                return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
            case 'expense':
                return <ArrowUpRight className="w-5 h-5 text-red-600" />;
            case 'transfer_out':
                return <Send className="w-5 h-5 text-blue-600" />;
            case 'transfer_in':
                return <ArrowDownLeft className="w-5 h-5 text-purple-600" />;
            default:
                return <History className="w-5 h-5 text-gray-600" />;
        }
    };

    const getTransactionBgColor = (type: Transaction['type']) => {
        switch (type) {
            case 'income':
                return 'bg-green-100';
            case 'expense':
                return 'bg-red-100';
            case 'transfer_out':
                return 'bg-blue-100';
            case 'transfer_in':
                return 'bg-purple-100';
            default:
                return 'bg-gray-100';
        }
    };

    const getAmountColor = (type: Transaction['type']) => {
        return type === 'income' || type === 'transfer_in' ? 'text-green-600' : 'text-red-600';
    };

    const getAmountPrefix = (type: Transaction['type']) => {
        return type === 'income' || type === 'transfer_in' ? '+' : '-';
    };

    return (
        <div className="screen-container">
            <Header
                title="Historial de Movimientos"
                showBack
                onBack={onBack}
            />

            <div className="screen-content space-y-6">
                {/* Filtros */}
                <div className="card">
                    <div className="flex items-center mb-4">
                        <Filter className="w-5 h-5 text-gray-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">Filtrar por tipo</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                filter === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilter('income')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                filter === 'income'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Ingresos
                        </button>
                        <button
                            onClick={() => setFilter('expense')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                filter === 'expense'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Gastos
                        </button>
                        <button
                            onClick={() => setFilter('transfers')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                filter === 'transfers'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Transferencias
                        </button>
                    </div>
                </div>

                {/* Lista de transacciones */}
                <div className="card">
                    {filteredTransactions.length > 0 ? (
                        <div className="space-y-1">
                            {filteredTransactions.map((transaction, index) => (
                                <div
                                    key={transaction.id}
                                    className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 ${
                                        index !== filteredTransactions.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                                >
                                    <div className="flex items-center flex-1">
                                        <div className={`p-3 rounded-full mr-4 ${getTransactionBgColor(transaction.type)}`}>
                                            {getTransactionIcon(transaction.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {transaction.description}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{formatDate(transaction.date)}</span>
                                            </div>
                                            {transaction.toUser && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Para: {transaction.toUser}
                                                </p>
                                            )}
                                            {transaction.fromUser && (
                                                <p className="text-xs text-purple-600 mt-1">
                                                    De: {transaction.fromUser}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                    <span className={`font-bold text-lg ${getAmountColor(transaction.type)}`}>
                      {getAmountPrefix(transaction.type)}{formatCurrency(transaction.amount)}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {filter === 'all' ? 'No hay movimientos aún' : 'No hay movimientos de este tipo'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {filter === 'all'
                                    ? 'Comenzá cargando dinero a tu billetera'
                                    : 'Probá cambiando el filtro para ver otros movimientos'
                                }
                            </p>
                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
                                >
                                    Ver todos los movimientos
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Resumen estadístico */}
                {filteredTransactions.length > 0 && (
                    <div className="card">
                        <h3 className="font-semibold text-gray-900 mb-4">Resumen</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">Total Ingresos</p>
                                <p className="text-lg font-bold text-green-700">
                                    {formatCurrency(
                                        filteredTransactions
                                            .filter(t => t.type === 'income' || t.type === 'transfer_in')
                                            .reduce((sum, t) => sum + t.amount, 0)
                                    )}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">Total Gastos</p>
                                <p className="text-lg font-bold text-red-700">
                                    {formatCurrency(
                                        filteredTransactions
                                            .filter(t => t.type === 'expense' || t.type === 'transfer_out')
                                            .reduce((sum, t) => sum + t.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};