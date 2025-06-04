import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DollarSign, Plus, AlertCircle } from 'lucide-react';
import type { LoadForm } from '../types/types';
import { formatCurrency, isValidAmount } from '../utils/formatters';
import { Header } from '../ui/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import type { LoadDto } from '../dto/LoadDto';

export const LoadMoneyScreen = () => {
    const [form, setForm] = useState<LoadForm>({
        amount: '',
    });
    const [errors, setErrors] = useState<{
        amount?: string;
        general?: string
    }>({});
    const user = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [balance, setBalance] = useState<number>();
    const navigate = useNavigate();

    const predefinedAmounts = [1000, 5000, 10000, 20000];

    useEffect(() => {
        // Fetch user wallet and ask for balance
        const fetchWallet = async () => {
            try {
                const response = await fetch(`http://localhost:3001/wallet/${user.user?.cvu}`);
                if (!response.ok) {
                    throw new Error('Error fetching wallet');
                }
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching wallet:', error);
            }
        }
        fetchWallet();
    });

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate('/dashboard');
            }, 1200); // 1.2 segundos para mostrar el mensaje de éxito
            return () => clearTimeout(timeout);
        }
    }, [success, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { amount?: string; general?: string } = {};

        // Validar monto
        if (!form.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!isValidAmount(form.amount)) {
            newErrors.amount = 'Ingresá un monto válido';
        } else {
            const amount = parseFloat(form.amount);
            if (amount < 100) {
                newErrors.amount = 'El monto mínimo es $100';
            }
            if (amount > 500000) {
                newErrors.amount = 'El monto máximo es $500.000';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            setSuccess(false);

            if (!user.user) {
                setErrors({ general: 'Usuario no encontrado' });
                setIsLoading(false);
                return;
            }

            const loadDto: LoadDto = {
                email: user.user.email,
                cvu: user.user.cvu,
                amount: parseFloat(form.amount)
            }

            try {
                const response = await fetch(`http://localhost:3001/api`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loadDto),
                });
                const data = await response.json();
                console.log(data);
                if (data.message === 'OK') {
                    setSuccess(true);
                } else {
                    setErrors({ general: data.message || data.error });
                }
            } catch (err) {
                setErrors({ general: 'Error de red' });
            }
            setIsLoading(false);
        }
    };

    const handleAmountChange = (value: string) => {
        // Solo permitir números y punto decimal
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setForm(prev => ({ ...prev, amount: value }));
        }
    };

    const handlePredefinedAmount = (amount: number) => {
        setForm(prev => ({ ...prev, amount: amount.toString() }));
    };

    return (
        <StyledWrapper>
            <Header
                title="Cargar Dinero"
                showBack
                onBack={() => navigate('/dashboard')}
            />

            <div className="screen-content">
                <InfoCard>
                    <h4>
                        💸 {'Método de pago'}
                    </h4>
                    <p>
                        {'La carga de dinero se realiza exclusivamente mediante '}
                        <b>DEBIN</b>
                        {'.'}
                    </p>
                </InfoCard>

                {/* Current Balance */}
                <BalanceCard>
                    <div className="balance-info">
                        <span className="label">Saldo actual:</span>
                        <span className="amount">
                            {formatCurrency(balance ?? 0)}
                        </span>
                    </div>
                </BalanceCard>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <FormCard>
                        {/* General Error */}
                        {errors.general && (
                            <ErrorMessage>
                                <AlertCircle className="icon" />
                                <span>{errors.general}</span>
                            </ErrorMessage>
                        )}

                        {/* Quick Amounts */}
                        <FormSection>
                            <Label>Montos rápidos</Label>
                            <QuickAmounts>
                                {predefinedAmounts.map((amount) => (
                                    <QuickAmountButton
                                        key={amount}
                                        type="button"
                                        onClick={() => handlePredefinedAmount(amount)}
                                        selected={form.amount === amount.toString()}
                                        disabled={isLoading}
                                    >
                                        {formatCurrency(amount)}
                                    </QuickAmountButton>
                                ))}
                            </QuickAmounts>
                        </FormSection>

                        {/* Custom Amount */}
                        <FormSection>
                            <Label>Monto personalizado</Label>
                            <InputWrapper>
                                <DollarSign className="input-icon" />
                                <Input
                                    type="text"
                                    value={form.amount}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    placeholder="0.00"
                                    hasError={!!errors.amount}
                                    disabled={isLoading}
                                />
                            </InputWrapper>
                            {errors.amount && (
                                <ErrorText>{errors.amount}</ErrorText>
                            )}
                            <HelpText>
                                Monto mínimo: $100 - Máximo: $500.000
                            </HelpText>
                        </FormSection>
                    </FormCard>

                    {/* Submit Button */}
                    <SubmitButton
                        type="submit"
                        disabled={isLoading || !form.amount}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                Procesando...
                            </>
                        ) : success ? (
                            <>
                                <span style={{ color: '#22c55e', fontSize: 20 }}>✔</span>
                                ¡Carga exitosa!
                            </>
                        ) : (
                            <>
                                <Plus className="button-icon" />
                                Cargar Dinero
                            </>
                        )}
                    </SubmitButton>
                </form>
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

        form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
`;

const BalanceCard = styled.div`
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 16px;
    padding: 16px;

    .balance-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .label {
        color: #22c55e;
        font-weight: 500;
    }

    .amount {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
    }
`;

const FormCard = styled.div`
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    width: 100%; 
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Label = styled.label`
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 500;
`;

const QuickAmounts = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
`;

interface QuickAmountButtonProps {
    selected: boolean;
}

const QuickAmountButton = styled.button<QuickAmountButtonProps>`
    padding: 12px;
    border-radius: 12px;
    background: ${props => props.selected ? 'rgba(0, 191, 255, 0.1)' : '#222'};
    border: 1px solid ${props => props.selected ? '#00bfff' : '#333'};
    color: ${props => props.selected ? '#00bfff' : '#fff'};
    font-weight: 500;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: ${props => props.selected ? 'rgba(0, 191, 255, 0.15)' : '#2a2a2a'};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const InputWrapper = styled.div`
    position: relative;

    .input-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: rgba(255, 255, 255, 0.4);
    }
`;

interface InputProps {
    hasError: boolean;
}

const Input = styled.input<InputProps>`
    width: calc(100% - 48px);
    padding: 12px 12px 12px 40px;
    background: #222;
    border: 1px solid ${props => props.hasError ? '#ef4444' : '#333'};
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #00bfff;
        box-shadow: 0 0 0 2px rgba(0, 191, 255, 0.2);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    color: #ef4444;

    .icon {
        width: 20px;
        height: 20px;
    }
`;

const ErrorText = styled.p`
    color: #ef4444;
    font-size: 14px;
    margin-top: 4px;
`;

const HelpText = styled.p`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px;
    background: #00bfff;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: #0099ff;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .button-icon {
        width: 20px;
        height: 20px;
    }
`;

const LoadingSpinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const InfoCard = styled.div`
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 16px;
    padding: 16px;

    h4 {
        color: #fff;
        font-weight: 500;
        margin-bottom: 8px;
    }

    p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        line-height: 1.5;
    }
`;