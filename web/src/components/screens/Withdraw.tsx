import React, { useState } from 'react';
import { DollarSign, ChevronLeft } from 'lucide-react';
import { WithdrawForm, User } from '../../types/types';
import { formatCurrency, isValidAmount } from '../../utils/formatters';
import { Header } from '../ui/Header';

interface WithdrawScreenProps {
    user: User;
    onWithdraw: (amount: number, bankAccount: string) => void;
    onBack: () => void;
}

export const WithdrawScreen: React.FC<WithdrawScreenProps> = ({
                                                                  user,
                                                                  onWithdraw,
                                                                  onBack
                                                              }) => {
    const [form, setForm] = useState<WithdrawForm>({ amount: '', bankAccount: '' });
    const [errors, setErrors] = useState<{ amount?: string; bankAccount?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { amount?: string; bankAccount?: string } = {};

        if (!form.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!isValidAmount(form.amount)) {
            newErrors.amount = 'El monto debe ser un número válido mayor a 0';
        } else {
            const amount = parseFloat(form.amount);
            if (amount > user.balance) {
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
            onWithdraw(parseFloat(form.amount), form.bankAccount);
        }
    };

    return (
        <div className="screen-container">
            <Header
                title="Extraer Dinero"
                showBack
                onBack={onBack}
            />

            <div className="screen-content space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Formulario */}
                    <div className="card space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cuenta bancaria destino
                            </label>
                            <input
                                type="text"
                                value={form.bankAccount}
                                onChange={(e) => setForm(prev => ({ ...prev, bankAccount: e.target.value }))}
                                className={`input-field ${errors.bankAccount ? 'border-red-500' : ''}`}
                                placeholder="CBU o Alias de cuenta"
                            />
                            {errors.bankAccount && (
                                <p className="mt-1 text-sm text-red-600">{errors.bankAccount}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Monto a extraer
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={form.amount}
                                    onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
                                    className={`input-field pl-10 ${errors.amount ? 'border-red-500' : ''}`}
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                            )}
                        </div>
                    </div>

                    {/* Información de saldo */}
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <p className="text-sm text-red-800">
                            <strong>Saldo disponible:</strong> {formatCurrency(user.balance)}
                        </p>
                    </div>

                    {/* Aviso de simulación */}
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                            <strong>Aviso:</strong> Esta es una simulación. En la app real se integraría con sistemas bancarios reales.
                        </p>
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!form.amount || !form.bankAccount}
                    >
                        Extraer Dinero
                    </button>
                </form>
            </div>
        </div>
    );
};