import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { theme } from '../styles/theme';
import { useAuth } from '../utils/AuthContext';
import { TransactionList } from '../components/TransactionList';
import { Header } from '../ui/Header';
import { useNavigate } from 'react-router-dom';
import { getIp } from '../hooks/ipHook';

interface Transaction {
    amount: number;
    senderCvu: number;
    receiverCvu: number;
    description: string;
}

export const HistoryScreen = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const ip = getIp();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://${ip}:3001/users/transactions?email=${encodeURIComponent(user?.email || '')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.email) {
            fetchTransactions();
        }
    }, [user?.email]);

    return (
        <StyledWrapper>
            <Header
                title="Historial"
                showBack
                onBack={() => navigate('/dashboard')}
            />
            <main>
                <Card className="history-card" padding="lg">
                    <TransactionList transactions={transactions} isLoading={isLoading} />
                </Card>
            </main>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(to bottom right, #1a1a1a, #2d2d2d);
    color: #fff;
    width: 100%;
    box-sizing: border-box;

    main {
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
