import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    CreditCard,
    Plus,
    Send,
    History as HistoryIcon,
    Eye,
    EyeOff,
    LogOut
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import type {WalletDto} from "../dto/WalletDto.ts";
import { TransactionList } from '../components/TransactionList';
import { getIp } from '../hooks/ipHook.ts';

interface Transaction {
    amount: number;
    senderCvu: number;
    receiverCvu: number;
    description: string;
}

export const DashboardScreen = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [realBalance, setRealBalance] = useState<number | null>(null);
    const [showBalance, setShowBalance] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
    const ip = getIp();

    useEffect(() => {
        const fetchBalance = async () => {
            if (!user?.email) return;
            const res = await fetch(`http://${ip}:3001/wallet/${user.cvu}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const wallet = await res.json() as WalletDto;
            setRealBalance(wallet.balance);
        };
        fetchBalance();
    }, [user]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoadingTransactions(true);
                const response = await fetch(`http://${ip}:3001/users/transactions?email=${encodeURIComponent(user?.email || '')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                console.log('Transactions loaded:', data); // Debug log
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setIsLoadingTransactions(false);
            }
        };

        if (user?.email) {
            fetchTransactions();
        }
    }, [user?.email]);

    const formatBalance = (balance: number | null) => {
        if (balance === null) return '';
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(balance);
    };

    return (
        <StyledWrapper>
            <Header>
                <div className="logo">PayUp</div>
                <Button 
                    variant="ghost" 
                    icon={<LogOut />} 
                    onClick={() => { logout(); navigate('/login'); }}
                    size="sm"
                >
                    Cerrar sesión
                </Button>
            </Header>

            <main>
                {/* Balance Card */}
                <Card variant="primary" className="balance-card" padding="xl">
                    <div className="balance-header">
                        <div>
                            <p className="label">Saldo disponible</p>
                            <div className="amount-container">
                                {showBalance ? (
                                    <span className="amount">
                                        {realBalance !== null ? formatBalance(realBalance) : ''}
                                    </span>
                                ) : (
                                    <span className="amount">••••••</span>
                                )}
                                <Button
                                    variant="ghost"
                                    icon={showBalance ? <EyeOff /> : <Eye />}
                                    onClick={() => setShowBalance((prev) => !prev)}
                                    size="sm"
                                />
                            </div>
                        </div>
                        <CreditCard className="card-icon" />
                    </div>
                    <p className="email" style={{ textAlign: 'left', fontSize: '14px' }}>Email: {user?.email}</p>
                    <p className="cvu" style={{ textAlign: 'left', marginTop: '4px', opacity: 0.8, fontSize: '14px' }}>CVU: {user?.cvu}</p>
                </Card>

                {/* Quick Actions */}
                <section className="actions-grid">
                    <Card onClick={() => navigate('/load')} className="action-card" padding="lg">
                        <div className="icon-container success">
                            <Plus className="icon" />
                        </div>
                        <span className="action-title">Ingresar</span>
                        <span className="action-subtitle">Dinero</span>
                    </Card>

                    <Card onClick={() => navigate('/transfer')} className="action-card" padding="lg">
                        <div className="icon-container primary">
                            <Send className="icon" />
                        </div>
                        <span className="action-title">Enviar</span>
                        <span className="action-subtitle">Dinero</span>
                    </Card>

                    <Card onClick={() => navigate('/history')} className="action-card" padding="lg">
                        <div className="icon-container secondary">
                            <HistoryIcon className="icon" />
                        </div>
                        <span className="action-title">Historial</span>
                        <span className="action-subtitle">Movimientos</span>
                    </Card>
                </section>

                {/* Transactions Section */}
                <Card className="transactions-card" padding="lg">
                    <div className="card-header">
                        <h3>Últimos movimientos</h3>
                        {transactions.length > 3 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/history')}
                            >
                                Ver todos
                            </Button>
                        )}
                    </div>
                    <TransactionList transactions={transactions} limit={3} isLoading={isLoadingTransactions} />
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

    /* Remove tap highlight color */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    main {
        max-width: 1000px;
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

        @media (min-width: 1200px) {
            main {
                max-width: 1200px;
            }
        }
    }

    .balance-card {
        background: linear-gradient(to bottom right, #4F46E5, #7C3AED);
        .balance-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: ${theme.spacing.lg};

            @media (max-width: ${theme.breakpoints.mobile}) {
                margin-bottom: ${theme.spacing.md};
            }
        }

        .label {
            color: ${theme.colors.text.inverse};
            opacity: 0.8;
            font-size: 14px;
            margin-bottom: ${theme.spacing.xs};
            text-align: left;
        }

        .amount-container {
            display: flex;
            align-items: center;
            gap: ${theme.spacing.sm};
        }

        .amount {
            font-size: 36px;
            font-weight: bold;

            @media (max-width: ${theme.breakpoints.mobile}) {
                font-size: 28px;
            }
        }

        .card-icon {
            width: 32px;
            height: 32px;
            color: ${theme.colors.text.inverse};
            opacity: 0.8;
        }

        .email {
            color: ${theme.colors.text.inverse};
            opacity: 0.8;
            font-size: 14px;
        }
    }

    .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); // esto es más fluido
        gap: ${theme.spacing.md};

        @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            grid-template-columns: repeat(3, 1fr);
            gap: ${theme.spacing.sm};
        }
    }


    .action-card {
        text-align: center;

        .icon-container {
            width: 48px;
            height: 48px;
            border-radius: ${theme.borderRadius.md};
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto ${theme.spacing.sm};

            &.success { 
                background: ${theme.colors.success.background};
                .icon { color: ${theme.colors.success.main}; }
            }
            &.primary { 
                background: ${theme.colors.primary.light}20;
                .icon { color: ${theme.colors.primary.main}; }
            }
            &.error { 
                background: ${theme.colors.error.background};
                .icon { color: ${theme.colors.error.main}; }
            }
            &.secondary { 
                background: ${theme.colors.secondary.light}20;
                .icon { color: ${theme.colors.secondary.main}; }
            }

            @media (max-width: ${theme.breakpoints.mobile}) {
                width: 40px;
                height: 40px;

                .icon {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .action-title {
            color: ${theme.colors.text.primary};
            font-weight: 600;
            margin-bottom: ${theme.spacing.xs};
            display: block;
        }

        .action-subtitle {
            color: ${theme.colors.text.secondary};
            font-size: 14px;
            display: block;
        }
    }

    .transactions-card {
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: ${theme.spacing.md};

            h3 {
                font-size: 18px;
                font-weight: 600;
                color: ${theme.colors.text.primary};
            }
        }
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    box-sizing: border-box;
    height: 72px;

    .logo {
        font-size: 20px;
        font-weight: 600;
        background: ${theme.colors.primary.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: 16px 20px;
        height: 64px;
        
        .logo {
            font-size: 18px;
        }
    }
`;