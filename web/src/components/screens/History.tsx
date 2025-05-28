import React, { useState } from 'react';
import styled from 'styled-components';
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
                return <ArrowDownLeft className="icon" />;
            case 'expense':
                return <ArrowUpRight className="icon" />;
            case 'transfer_out':
                return <Send className="icon" />;
            case 'transfer_in':
                return <ArrowDownLeft className="icon" />;
            default:
                return <History className="icon" />;
        }
    };

    const getTransactionColor = (type: Transaction['type']) => {
        switch (type) {
            case 'income':
                return 'green';
            case 'expense':
                return 'red';
            case 'transfer_out':
                return 'blue';
            case 'transfer_in':
                return 'purple';
            default:
                return 'gray';
        }
    };

    return (
        <StyledWrapper>
            <Header
                title="Historial de Movimientos"
                showBack
                onBack={onBack}
            />

            <div className="screen-content">
                {/* Filters */}
                <FiltersCard>
                    <div className="header">
                        <Filter className="icon" />
                        <h3>Filtrar por tipo</h3>
                    </div>
                    <div className="filters">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </FilterButton>
                        <FilterButton
                            active={filter === 'income'}
                            color="green"
                            onClick={() => setFilter('income')}
                        >
                            Ingresos
                        </FilterButton>
                        <FilterButton
                            active={filter === 'expense'}
                            color="red"
                            onClick={() => setFilter('expense')}
                        >
                            Gastos
                        </FilterButton>
                        <FilterButton
                            active={filter === 'transfers'}
                            color="blue"
                            onClick={() => setFilter('transfers')}
                        >
                            Transferencias
                        </FilterButton>
                    </div>
                </FiltersCard>

                {/* Transactions List */}
                <TransactionsCard>
                    {filteredTransactions.length > 0 ? (
                        <div className="transactions-list">
                            {filteredTransactions.map((transaction, index) => (
                                <TransactionItem key={transaction.id}>
                                    <div className="transaction-info">
                                        <div className={`icon-container ${getTransactionColor(transaction.type)}`}>
                                            {getTransactionIcon(transaction.type)}
                                        </div>
                                        <div className="details">
                                            <p className="description">
                                                {transaction.description}
                                            </p>
                                            <div className="date">
                                                <Calendar className="calendar-icon" />
                                                <span>{formatDate(transaction.date)}</span>
                                            </div>
                                            {transaction.toUser && (
                                                <p className="user-info to">
                                                    Para: {transaction.toUser}
                                                </p>
                                            )}
                                            {transaction.fromUser && (
                                                <p className="user-info from">
                                                    De: {transaction.fromUser}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`amount ${
                                        transaction.type === 'income' || transaction.type === 'transfer_in'
                                            ? 'income'
                                            : 'expense'
                                    }`}>
                                        {transaction.type === 'income' || transaction.type === 'transfer_in' ? '+' : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </TransactionItem>
                            ))}
                        </div>
                    ) : (
                        <EmptyState>
                            <History className="icon" />
                            <h3 className="title">
                                {filter === 'all' ? 'No hay movimientos aún' : 'No hay movimientos de este tipo'}
                            </h3>
                            <p className="message">
                                {filter === 'all'
                                    ? 'Comenzá cargando dinero a tu billetera'
                                    : 'Probá cambiando el filtro para ver otros movimientos'
                                }
                            </p>
                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="view-all"
                                >
                                    Ver todos los movimientos
                                </button>
                            )}
                        </EmptyState>
                    )}
                </TransactionsCard>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(to bottom right, #1a1a1a, #2d2d2d);
    color: #fff;
    
    .screen-content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

const FiltersCard = styled.div`
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 24px;

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .icon {
            width: 20px;
            height: 20px;
            color: rgba(255, 255, 255, 0.6);
            margin-right: 8px;
        }

        h3 {
            color: #fff;
            font-weight: 600;
        }
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
`;

interface FilterButtonProps {
    active: boolean;
    color?: 'green' | 'red' | 'blue';
}

const FilterButton = styled.button<FilterButtonProps>`
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    background: ${props => {
        if (!props.active) return 'rgba(255, 255, 255, 0.1)';
        if (props.color === 'green') return '#22c55e';
        if (props.color === 'red') return '#ef4444';
        if (props.color === 'blue') return '#3b82f6';
        return '#00bfff';
    }};
    color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};

    &:hover {
        background: ${props => {
            if (!props.active) return 'rgba(255, 255, 255, 0.15)';
            if (props.color === 'green') return '#16a34a';
            if (props.color === 'red') return '#dc2626';
            if (props.color === 'blue') return '#2563eb';
            return '#0099ff';
        }};
    }
`;

const TransactionsCard = styled.div`
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 24px;

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    transition: background-color 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .transaction-info {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .icon-container {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.green { background: rgba(34, 197, 94, 0.2); }
        &.red { background: rgba(239, 68, 68, 0.2); }
        &.blue { background: rgba(59, 130, 246, 0.2); }
        &.purple { background: rgba(168, 85, 247, 0.2); }

        .icon {
            width: 24px;
            height: 24px;
            &.green { color: #22c55e; }
            &.red { color: #ef4444; }
            &.blue { color: #3b82f6; }
            &.purple { color: #a855f7; }
        }
    }

    .details {
        .description {
            color: #fff;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .date {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
            margin-bottom: 4px;

            .calendar-icon {
                width: 12px;
                height: 12px;
                margin-right: 4px;
            }
        }

        .user-info {
            font-size: 12px;
            margin-top: 4px;

            &.to { color: #3b82f6; }
            &.from { color: #a855f7; }
        }
    }

    .amount {
        font-weight: 600;
        font-size: 16px;
        &.income { color: #22c55e; }
        &.expense { color: #ef4444; }
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 48px 0;

    .icon {
        width: 48px;
        height: 48px;
        color: rgba(255, 255, 255, 0.4);
        margin: 0 auto 16px;
    }

    .title {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .message {
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 16px;
    }

    .view-all {
        color: #00bfff;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s;

        &:hover {
            background: rgba(0, 191, 255, 0.1);
        }
    }
`;