import React, { useState } from 'react';
import styled from 'styled-components';
import { DollarSign, Send, AlertCircle } from 'lucide-react';
import type{ TransferForm } from '../types/types';
import { formatCurrency, isValidAmount, isValidEmail } from '../utils/formatters';
import { Header } from '../ui/Header';
import { useNavigate } from 'react-router-dom';
import { fetchBalance } from '../hooks/balanceHook';
import { useAuth } from '../utils/AuthContext';
import { getIp } from '../hooks/ipHook';

export const TransferScreen = () => {
    const [form, setForm] = useState<TransferForm>({
        recipient: '',
        amount: '',
        description: ''
    });
    const [errors, setErrors] = useState<{
        recipient?: string;
        amount?: string;
        general?: string
    }>({});
    const user = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [recipientType, setRecipientType] = useState<'email' | 'cvu'>('email');
    const { balance } = fetchBalance(user.user?.cvu);
    const navigate = useNavigate();
    const ip = getIp();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { recipient?: string; amount?: string; general?: string } = {};

        // Validar destinatario según tipo
        if (!form.recipient) {
            newErrors.recipient = recipientType === 'email' ? 'El email es requerido' : 'El CVU es requerido';
        } else if (recipientType === 'email' && !isValidEmail(form.recipient)) {
            newErrors.recipient = 'Ingresá un email válido';
        } else if (recipientType === 'cvu' && !/^\d{6}$/.test(form.recipient)) {
            newErrors.recipient = 'Ingresá un CVU válido (6 dígitos)';
        }

        // Validate amount
        if (!form.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!isValidAmount(form.amount)) {
            newErrors.amount = 'Ingresá un monto válido';
        } else {
            const amount = parseFloat(form.amount);
            if (amount > (balance ?? 0)) {
                newErrors.amount = 'No tenés saldo suficiente';
            }
            if (amount < 1) {
                newErrors.amount = 'El monto mínimo es $1';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const endpoint = recipientType === 'email' 
                    ? `http://${ip}:3001/payment/transferByEmail`
                    : `http://${ip}:3001/payment/transferByCvu`;

                const requestBody = recipientType === 'email'
                    ? {
                        senderCvu: Number(user.user?.cvu),
                        receiverEmail: form.recipient,
                        amount: Number(form.amount),
                        description: form.description
                    }
                    : {
                        senderCvu: Number(user.user?.cvu),
                        receiverCvu: Number(form.recipient),
                        amount: Number(form.amount),
                        description: form.description
                    };

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to transfer money');
                }

                const data = await response.json();
                console.log('Transfer successful:', data);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error transferring money:', error);
                setErrors(prev => ({
                    ...prev,
                    general: error instanceof Error ? error.message : 'Error al transferir el dinero'
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleAmountChange = (value: string) => {
        // Only allow numbers and decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setForm(prev => ({ ...prev, amount: value }));
        }
    };

    const max_characters = 10;

    return (
        <StyledWrapper>
            <Header
                title="Enviar Dinero"
                showBack
                onBack={() => navigate('/dashboard')}
            />

            <div className="screen-content">
                {/* Available Balance */}
                <BalanceCard>
                    <div className="balance-info">
                        <span className="label">Saldo disponible:</span>
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

                        {/* Selector de tipo de destinatario */}
                        <FormSection>
                            <Label>Enviar a:</Label>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                <label>
                                    <input
                                        type="radio"
                                        name="recipientType"
                                        value="email"
                                        checked={recipientType === 'email'}
                                        onChange={() => setRecipientType('email')}
                                        disabled={isLoading}
                                    />
                                    Email
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="recipientType"
                                        value="cvu"
                                        checked={recipientType === 'cvu'}
                                        onChange={() => setRecipientType('cvu')}
                                        disabled={isLoading}
                                    />
                                    CVU
                                </label>
                            </div>
                        </FormSection>

                        {/* Recipient */}
                        <FormSection>
                            <Label>Destinatario ({recipientType === 'email' ? 'Email' : 'CVU'})</Label>
                            <Input
                                type={recipientType === 'email' ? 'email' : 'text'}
                                value={form.recipient}
                                onChange={(e) => setForm(prev => ({ ...prev, recipient: e.target.value }))}
                                placeholder={recipientType === 'email' ? 'juan@email.com' : '123456'}
                                hasError={!!errors.recipient}
                                disabled={isLoading}
                                maxLength={recipientType === 'cvu' ? 6 : undefined}
                            />
                            {errors.recipient && (
                                <ErrorText>{errors.recipient}</ErrorText>
                            )}
                        </FormSection>

                        {/* Amount */}
                        <FormSection>
                            <Label>Monto</Label>
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
                        </FormSection>

                        {/* Description */}
                        <FormSection>
                            <Label>Descripción (opcional)</Label>
                            <Input
                                type="text"
                                value={form.description}
                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="¿Para qué es esta transferencia?"
                                maxLength={max_characters}
                                disabled={isLoading}
                            />
                            <HelpText>
                                {form.description.length}/{max_characters} caracteres
                            </HelpText>
                        </FormSection>
                    </FormCard>

                    {/* Submit Button */}
                    <SubmitButton
                        type="submit"
                        disabled={isLoading || !form.recipient || !form.amount}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="button-icon" />
                                Enviar Dinero
                            </>
                        )}
                    </SubmitButton>
                </form>

                {/* Additional Info */}
                <InfoCard>
                    <h4>Información importante:</h4>
                    <ul>
                        <li>Las transferencias son inmediatas</li>
                        <li>Verificá bien el email del destinatario</li>
                        <li>Las transferencias no se pueden cancelar</li>
                    </ul>
                </InfoCard>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(to bottom right, #1a1a1a, #2d2d2d);
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    
    .screen-content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-sizing: border-box;
        width: 100%;

        @media (max-width: 480px) {
            padding: 16px;
            gap: 16px;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;

            @media (max-width: 480px) {
                gap: 16px;
            }
        }
    }
`;

const BalanceCard = styled.div`
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 16px;
    padding: 16px;

    .balance-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .label {
        color: #3b82f6;
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
    text-align: left;
`;

const HelpText = styled.p`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    text-align: left;
    margin-top: 4px;
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