import React, { useState } from 'react';
import { ChevronLeft, DollarSign, Send, AlertCircle } from 'lucide-react';
import { TransferForm, User } from '../../types/types';
import { formatCurrency, isValidAmount, isValidEmail } from '../../utils/formatters';
import { Header } from '../ui/Header';

interface TransferScreenProps {
    user: User;
    onTransfer: (recipient: string, amount: number, description: string) => void;
    onNavigateBack: () => void;
}

export const TransferScreen: React.FC<TransferScreenProps> = ({
                                                                  user,
                                                                  onTransfer,
                                                                  onNavigateBack
                                                              }) => {
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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { recipient?: string; amount?: string; general?: string } = {};

        // Validar destinatario
        if (!form.recipient) {
            newErrors.recipient = 'El destinatario es requerido';
        } else if (!isValidEmail(form.recipient)) {
            newErrors.recipient = 'Ingresá un email válido';
        }

        // Validar monto
        if (!form.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!isValidAmount(form.amount)) {
            newErrors.amount = 'Ingresá un monto válido';
        } else {
            const amount = parseFloat(form.amount);
            if (amount > user.balance) {
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
                const amount = parseFloat(form.amount);
                await onTransfer(form.recipient, amount, form.description);
                // El formulario se limpia en el componente padre
            } catch (error) {
                setErrors({ general: 'Error al realizar la transferencia. Intentá nuevamente.' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleAmountChange = (value: string) => {
        // Solo permitir números y punto decimal
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setForm(prev => ({ ...prev, amount: value }));
        }
    };

    return (
        <div className="screen-container">
            <Header
                title="Enviar Dinero"
                showBack
                onBack={onNavigateBack}
            />

            <div className="screen-content space-y-6">
                {/* Saldo disponible */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">Saldo disponible:</span>
                        <span className="text-lg font-bold text-blue-900">
              {formatCurrency(user.balance)}
            </span>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="card space-y-6">
                        {/* Error general */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                                <span className="text-sm text-red-800">{errors.general}</span>
                            </div>
                        )}

                        {/* Destinatario */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Destinatario (Email)
                            </label>
                            <input
                                type="email"
                                value={form.recipient}
                                onChange={(e) => setForm(prev => ({ ...prev, recipient: e.target.value }))}
                                className={`input-field ${errors.recipient ? 'border-red-500' : ''}`}
                                placeholder="juan@email.com"
                                disabled={isLoading}
                            />
                            {errors.recipient && (
                                <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
                            )}
                        </div>

                        {/* Monto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Monto
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={form.amount}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    className={`input-field pl-10 ${errors.amount ? 'border-red-500' : ''}`}
                                    placeholder="0.00"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                            )}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción (opcional)
                            </label>
                            <input
                                type="text"
                                value={form.description}
                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                className="input-field"
                                placeholder="¿Para qué es esta transferencia?"
                                maxLength={100}
                                disabled={isLoading}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {form.description.length}/100 caracteres
                            </p>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        disabled={isLoading || !form.recipient || !form.amount}
                        className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Enviar Dinero
                            </>
                        )}
                    </button>
                </form>

                {/* Información adicional */}
                <div className="bg-gray-50 rounded-xl p-4 border">
                    <h4 className="font-medium text-gray-900 mb-2">Información importante:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Las transferencias son inmediatas</li>
                        <li>• Verificá bien el email del destinatario</li>
                        <li>• Las transferencias no se pueden cancelar</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};