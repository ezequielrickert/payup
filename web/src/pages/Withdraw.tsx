import React, { useState } from 'react';
import styled from 'styled-components';
import { DollarSign } from 'lucide-react';
import type { WithdrawForm } from '../types/types';
import { formatCurrency, isValidAmount } from '../utils/formatters';
import { Header } from '../ui/Header';
import { useNavigate } from 'react-router-dom';

export const WithdrawScreen = () => {
    const [form, setForm] = useState<WithdrawForm>({ amount: '', bankAccount: '' });
    const [errors, setErrors] = useState<{ amount?: string; bankAccount?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { amount?: string; bankAccount?: string } = {};

        if (!form.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!isValidAmount(form.amount)) {
            newErrors.amount = 'El monto debe ser un número válido mayor a 0';
        } else {
            const amount = parseFloat(form.amount);
            if (amount > 1000) {
                newErrors.amount = 'No tenés suficiente saldo';
            }
        }

        if (!form.bankAccount) {
            newErrors.bankAccount = 'La cuenta bancaria es requerida';
        } else if (form.bankAccount.length < 8) {
            newErrors.bankAccount = 'Ingresá un CBU o alias válido';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
        }
    };

    return (
        <StyledWrapper>
            <Header
                title="Extraer Dinero"
                showBack
                onBack={() => navigate('/dashboard')}
            />

            <div className="screen-content">
                <form onSubmit={handleSubmit}>
                    <FormCard>
                        {/* Bank Account */}
                        <FormSection>
                            <Label>Cuenta bancaria destino</Label>
                            <Input
                                type="text"
                                value={form.bankAccount}
                                onChange={(e) => setForm(prev => ({ ...prev, bankAccount: e.target.value }))}
                                placeholder="CBU o Alias de cuenta"
                                hasError={!!errors.bankAccount}
                                disabled={isLoading}
                            />
                            {errors.bankAccount && (
                                <ErrorText>{errors.bankAccount}</ErrorText>
                            )}
                        </FormSection>

                        {/* Amount */}
                        <FormSection>
                            <Label>Monto a extraer</Label>
                            <InputWrapper>
                                <DollarSign className="input-icon" />
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={form.amount}
                                    onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
                                    placeholder="0.00"
                                    hasError={!!errors.amount}
                                    disabled={isLoading}
                                />
                            </InputWrapper>
                            {errors.amount && (
                                <ErrorText>{errors.amount}</ErrorText>
                            )}
                        </FormSection>
                    </FormCard>

                    {/* Balance Info */}
                    <BalanceCard>
                        <p>
                            <strong>Saldo disponible:</strong> {formatCurrency(1000)}
                        </p>
                    </BalanceCard>

                    {/* Submit Button */}
                    <SubmitButton
                        type="submit"
                        disabled={isLoading || !form.amount || !form.bankAccount}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                Procesando...
                            </>
                        ) : (
                            'Extraer Dinero'
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

const FormCard = styled.div`
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
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
    text-align: left;
    display: block;
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
    hasError?: boolean;
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

    /* Remove number input arrows */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
`;

const ErrorText = styled.p`
    color: #ef4444;
    font-size: 14px;
    margin-top: 4px;
    text-align: left;
`;

const BalanceCard = styled.div`
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 16px;
    padding: 16px;

    p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;

        strong {
            color: #ef4444;
            font-weight: 500;
            margin-right: 4px;
        }
    }
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px;
    background: #ef4444;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: #dc2626;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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