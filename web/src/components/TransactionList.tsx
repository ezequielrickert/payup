import React from 'react';
import { ArrowDownLeft, ArrowUpRight, ArrowDown, Send, History as HistoryIcon, Loader2, ArrowUp } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { StyledTransactionList } from './TransactionList.styles';

interface Transaction {
    amount: number;
    senderCvu: number;
    receiverCvu: number;
    description: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    limit?: number;
    isLoading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, limit, isLoading = false }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    };

    const getTransactionType = (transaction: Transaction) => {
        if (!user?.cvu) return 'transfer';
        if (transaction.senderCvu === transaction.receiverCvu && transaction.senderCvu === user.cvu) {
            if (transaction.description == 'Carga de saldo') {
                return 'self';
            } else {
                return 'withdraw';
            }
        }
        if (transaction.senderCvu === user.cvu) {
            return 'sent';
        }
        if (transaction.receiverCvu === user.cvu) {
            return 'received';
        }
        return 'transfer';
    };

    const displayTransactions = limit 
        ? [...transactions].reverse().slice(0, limit)
        : [...transactions].reverse();

    if (isLoading) {
        return (
            <StyledTransactionList>
                <div className="loading-state">
                    <Loader2 className="icon" />
                    <p className="message">Cargando movimientos...</p>
                </div>
            </StyledTransactionList>
        );
    }

    return (
        <StyledTransactionList>
            {transactions.length > 0 ? (
                <div className="transactions-list">
                    {displayTransactions.map((transaction, index) => {
                        const type = getTransactionType(transaction);
                        return (
                            <div key={index} className="transaction-item">
                                <div className="transaction-info">
                                    <div className={`icon-container ${type}`}>
                                        {type === 'sent' ? (
                                            <ArrowUpRight className="icon" />
                                        ) : type === 'received' ? (
                                            <ArrowDownLeft className="icon" />
                                        ) : type === 'self' ? (
                                            <ArrowDown className="icon" />
                                        ) : type === 'withdraw' ? (
                                            <ArrowUp className="icon" />
                                        ) : (
                                            <Send className="icon" />
                                        )}
                                    </div>
                                    <div className="details">
                                        <div className="cvu-display">
                                            {type === 'sent' ? transaction.receiverCvu : transaction.senderCvu}
                                        </div>
                                        {transaction.description && (
                                            <div className="description">
                                                {transaction.description.length > 50 
                                                    ? `${transaction.description.substring(0, 50)}...` 
                                                    : transaction.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className={`amount ${type}`}>
                                    {type === 'received' || type === 'self' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-state">
                    <HistoryIcon className="icon" />
                    <p className="message">No hay movimientos aún</p>
                    <p className="submessage" onClick={() => navigate('/load')}>
                        Comenzá cargando dinero a tu billetera
                    </p>
                </div>
            )}
        </StyledTransactionList>
    );
};
