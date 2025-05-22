import React, { useState } from 'react';
import { ChevronLeft, DollarSign, CreditCard, Building2, Smartphone, Plus, AlertCircle } from 'lucide-react';
import { LoadForm, User } from '../../types/types';
import { formatCurrency, isValidAmount } from '../../utils/formatters';
import { Header } from '../ui/Header';

interface LoadMoneyScreenProps {
    user: User;
    onLoadMoney: (amount: number, method: 'card' | 'bank' | 'debin') => void;
    onNavigateBack: () => void;
}

export const LoadMoneyScreen: React.FC<LoadMoneyScreenProps> = ({
                                                                    user,
                                                                    onLoadMoney,
                                                                    onNavigateBack
                                                                }) => {
    const [form, setForm] = useState<LoadForm>({
        amount: '',
        method: 'card'
    });
    const [errors, setErrors] = useState<{
        amount?: string;
        general?: string
    }>({});
    const [isLoading, setIsLoading] = useState(false);

    const paymentMethods = [
        {
            id: 'card',
            name: 'Tarjeta de crédito/débito',
            icon: CreditCard,
            description: 'Visa, Mastercard, etc.'
        },
        {
            id: 'bank',
            name: 'Cuenta bancaria',
            icon: Building2,
            description: 'Transferencia desde tu banco'
        },
        {
            id: 'debin',
            name: 'DEBIN',
            icon: Smartphone,
            description: 'Débito inmediato'
        }
    ];

    const predefinedAmounts = [1000, 5000, 10000, 20000];

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
            try {
                const amount = parseFloat(form.amount);
                await onLoadMoney(amount, form.method);
                // El formulario se limpia en el componente padre
            } catch (error) {
                setErrors({ general: 'Error al cargar el dinero. Intentá nuevamente.' });
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

    const handlePredefinedAmount = (amount: number) => {
        setForm(prev => ({ ...prev, amount: amount.toString() }));
    };

    return (
        <div className="screen-container">
            <Header
                title="Cargar Dinero"
                showBack
                onBack={onNavigateBack}
            />

            <div className="screen-content space-y-6">
                {/* Saldo actual */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Saldo actual:</span>
                        <span className="text-lg font-bold text-green-900">
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

                        {/* Método de pago */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Método de carga
                            </label>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => {
                                    const IconComponent = method.icon;
                                    return (
                                        <label
                                            key={method.id}
                                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                                form.method === method.id
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="method"
                                                value={method.id}
                                                checked={form.method === method.id}
                                                onChange={(e) => setForm(prev => ({ ...prev, method: e.target.value as 'card' | 'bank' | 'debin' }))}
                                                className="sr-only"
                                                disabled={isLoading}
                                            />
                                            <IconComponent className="w-6 h-6 text-gray-600 mr-4" />
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{method.name}</div>
                                                <div className="text-sm text-gray-600">{method.description}</div>
                                            </div>
                                            {form.method === method.id && (
                                                <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Montos predefinidos */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Montos rápidos
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {predefinedAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => handlePredefinedAmount(amount)}
                                        className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                                            form.amount === amount.toString()
                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                        disabled={isLoading}
                                    >
                                        {formatCurrency(amount)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Monto personalizado */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Monto personalizado
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
                            <p className="mt-1 text-xs text-gray-500">
                                Monto mínimo: $100 - Máximo: $500.000
                            </p>
                        </div>
                    </div>

                    {/* Botón de carga */}
                    <button
                        type="submit"
                        disabled={isLoading || !form.amount}
                        className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Procesando...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 mr-2" />
                                Cargar Dinero
                            </>
                        )}
                    </button>
                </form>

                {/* Información de seguridad */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">💳 Información de seguridad</h4>
                    <p className="text-sm text-blue-800">
                        Esta es una simulación. En la app real se integraría con proveedores de pago seguros
                        y certificados para proteger tu información financiera.
                    </p>
                </div>
            </div>
        </div>
    );
};