import React, { useState } from 'react';
import styled from 'styled-components';
import {
    History,
    ArrowDownLeft,
    ArrowUpRight,
    Send,
    Filter,
} from 'lucide-react';
import type{ Transaction } from '../types/types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Header } from '../ui/Header';
import {theme} from "../styles/theme";
import { useNavigate } from 'react-router-dom';

export const HistoryScreen = () => {
    const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'transfers'>('all');
    const navigate = useNavigate();

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
                return 'success';
            case 'expense':
                return 'error';
            case 'transfer_out':
                return 'primary';
            case 'transfer_in':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    return (
        <StyledWrapper>
            <Header
                title="Historial de Movimientos"
                showBack
                onBack={() => navigate('/dashboard')}
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
                            color="success"
                            onClick={() => setFilter('income')}
                        >
                            Ingresos
                        </FilterButton>
                        <FilterButton
                            active={filter === 'expense'}
                            color="error"
                            onClick={() => setFilter('expense')}
                        >
                            Gastos
                        </FilterButton>
                        <FilterButton
                            active={filter === 'transfers'}
                            color="primary"
                            onClick={() => setFilter('transfers')}
                        >
                            Transferencias
                        </FilterButton>
                    </div>
                </FiltersCard>

                {/* Transactions List */}
                <TransactionsCard>
                </TransactionsCard>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};

    .screen-content {
        max-width: 800px;
        margin: 0 auto;
        padding: ${theme.spacing.xl};
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.xl};

        @media (max-width: ${theme.breakpoints.tablet}) {
            padding: ${theme.spacing.lg};
            gap: ${theme.spacing.lg};
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            padding: ${theme.spacing.md};
            gap: ${theme.spacing.md};
        }
    }
`;

const FiltersCard = styled.div`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};

    .header {
        display: flex;
        align-items: center;
        margin-bottom: ${theme.spacing.md};

        .icon {
            width: 20px;
            height: 20px;
            color: ${theme.colors.text.secondary};
            margin-right: ${theme.spacing.sm};
        }

        h3 {
            color: ${theme.colors.text.primary};
            font-weight: 600;
            font-size: 16px;
        }
    }

    .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: ${theme.spacing.sm};

        @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            grid-template-columns: 1fr;
        }
    }
`;

interface FilterButtonProps {
    active: boolean;
    color?: 'success' | 'error' | 'primary';
}

const FilterButton = styled.button<FilterButtonProps>`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid ${theme.colors.border};

    background: ${props => {
        if (!props.active) return theme.colors.surface;
        if (props.color === 'success') return theme.colors.success.main;
        if (props.color === 'error') return theme.colors.error.main;
        if (props.color === 'primary') return theme.colors.primary.main;
        return theme.colors.primary.main;
    }};

    color: ${props => props.active ? '#fff' : theme.colors.text.secondary};

    &:hover {
        background: ${props => {
            if (!props.active) return theme.colors.surfaceHover;
            if (props.color === 'success') return theme.colors.success.main;
            if (props.color === 'error') return theme.colors.error.main;
            if (props.color === 'primary') return theme.colors.primary.dark;
            return theme.colors.primary.dark;
        }};
        color: ${props => props.active ? '#fff' : theme.colors.text.primary};
    }
`;

const TransactionsCard = styled.div`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.md};

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.sm}; 
    }

    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing.sm}; 
        border-radius: ${theme.borderRadius.md};
        transition: background-color 0.2s;

        &:hover {
            background: ${theme.colors.surfaceHover};
        }
    }

    .transaction-info {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
    }

    .icon-container {
        width: 40px;
        height: 40px;
        border-radius: ${theme.borderRadius.md};
        display: flex;
        align-items: center;
        justify-content: center;

        &.success {
            background: ${theme.colors.success.background};
            .icon { color: ${theme.colors.success.main}; }
        }
        &.error {
            background: ${theme.colors.error.background};
            .icon { color: ${theme.colors.error.main}; }
        }
        &.primary {
            background: ${theme.colors.primary.light}20;
            .icon { color: ${theme.colors.primary.main}; }
        }
        &.secondary {
            background: ${theme.colors.secondary.light}20;
            .icon { color: ${theme.colors.secondary.main}; }
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            width: 32px;
            height: 32px;

            .icon {
                width: 16px;
                height: 16px;
            }
        }
    }

    .details {
        .description {
            color: ${theme.colors.text.primary};
            font-weight: 500;
            margin: 16px 0 4px;
        }

        .date {
            color: ${theme.colors.text.secondary};
            font-size: 12px;
            margin: 12px 0px;
        }

        .user-info {
            font-size: 12px;
            margin: 2px 0;

            &.to {
                color: ${theme.colors.error.main};
            }

            &.from {
                color: ${theme.colors.success.main};
            }
        }
    }

    .amount {
        font-weight: 600;

        &.income {
            color: ${theme.colors.success.main};
        }

        &.expense {
            color: ${theme.colors.error.main};
        }
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: ${theme.spacing.xxl} 0; 
    
    .icon {
        width: 48px;
        height: 48px;
        color: ${theme.colors.text.secondary}; 
        margin: 0 auto ${theme.spacing.md};
    }

    .title {
        color: ${theme.colors.text.primary}; 
        font-size: 18px;
        font-weight: 600;
        margin-bottom: ${theme.spacing.xs};
    }

    .message {
        color: ${theme.colors.text.secondary}; 
        margin-bottom: ${theme.spacing.md};
    }

    .view-all {
        color: ${theme.colors.primary.main}; 
        font-weight: 500;
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border-radius: ${theme.borderRadius.md};
        transition: all 0.2s;

        &:hover {
            background: ${theme.colors.primary.light}20; 
        }
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: ${theme.spacing.xl} 0;

        .icon {
            width: 40px;
            height: 40px;
            margin-bottom: ${theme.spacing.sm};
        }
    }
`;