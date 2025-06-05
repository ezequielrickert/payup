import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    CreditCard,
    Plus,
    Send,
    Minus,
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

export const DashboardScreen = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [realBalance, setRealBalance] = useState<number | null>(null);
    const [showBalance, setShowBalance] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!user?.email) return;
            const res = await fetch(`http://localhost:3001/wallet/${user.cvu}`, {
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
                                        {realBalance !== null ? `$${realBalance}` : ''}
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
                    <p className="email">{user?.email}</p>
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

                    <Card onClick={() => navigate('/withdraw')} className="action-card" padding="lg">
                        <div className="icon-container error">
                            <Minus className="icon" />
                        </div>
                        <span className="action-title">Extraer</span>
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

                {/* Recent Transactions */}
                <Card className="transactions-card">
                    <div className="card-header">
                        <h3>Últimos movimientos</h3>
                        {true && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/history')}
                            >
                                Ver todos
                            </Button>
                        )}
                    </div>
                </Card>
            </main>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    
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
        grid-template-columns: repeat(4, 1fr);
        gap: ${theme.spacing.md};

        @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
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
                margin-bottom: 4px;
            }

            .date {
                color: ${theme.colors.text.secondary};
                font-size: 12px;
            }
        }

        .amount {
            font-weight: 600;
            &.success { color: ${theme.colors.success.main}; }
            &.error { color: ${theme.colors.error.main}; }
        }
    }

    .empty-state {
        text-align: center;
        padding: ${theme.spacing.xxl} 0;

        .icon {
            width: 48px;
            height: 48px;
            color: ${theme.colors.text.secondary};
            margin: 0 auto ${theme.spacing.md};
        }

        .message {
            color: ${theme.colors.text.primary};
            font-weight: 500;
            margin-bottom: ${theme.spacing.xs};
        }

        .submessage {
            color: ${theme.colors.text.secondary};
            font-size: 14px;
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            padding: ${theme.spacing.xl} 0;

            .icon {
                width: 40px;
                height: 40px;
                margin-bottom: ${theme.spacing.sm};
            }
        }
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    background: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 10;

    .logo {
        font-size: 20px;
        font-weight: 600;
        background: ${theme.colors.primary.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
        padding: ${theme.spacing.md};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: ${theme.spacing.sm} ${theme.spacing.md};

        .logo {
            font-size: 18px;
        }
    }
`;