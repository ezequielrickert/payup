import React, { useState } from 'react';
import { CreditCard, Mail, Lock } from 'lucide-react';
import { SignUpForm } from '../../types/types';
import { isValidEmail } from '../../utils/formatters';

interface SignUpScreenProps {
  onSignUp: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onSwitchToRegister
}) => {
  const [form, setForm] = useState<SignUpForm>({ email: '', password: '', confirmPassword: ''});
  const [errors, setErrors] = useState<{ email?: string; password?: string, confirmPassword?: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (!form.password || form.password !== form.confirmPassword) {
      newErrors.password = 'La contraseña no coincide';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSignUp(form.email, form.password);
    }
  };

  return (
    <div className="screen-container">
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Billetera</h1>
            <p className="text-gray-600">Registrá tu nueva cuenta</p>
          </div>

          {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
                            className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="tu@email.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
                            className={`input-field pl-10 ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="Ingrese una contraseña"
                        />
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm(prev => ({...prev, confirmPassword: e.target.value}))}
                            className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Confirmar la contraseña"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                </div>

                <button type="submit" className="btn-primary w-full">
                    Crear cuenta
                </button>
            </form>

            {/* Link a login */}
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    ¿No tenés cuenta?{' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-primary-600 font-semibold hover:text-primary-700 hover:underline transition-colors duration-200"
                    >
                        Registrate
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};