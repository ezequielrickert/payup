import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { UserDto } from '../dto/UserDto';

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const SignUpScreen = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!form.firstName) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!form.lastName) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!form.email) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!form.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    if (!form.confirmPassword || form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userDto = new UserDto(
        form.firstName + " " + form.lastName,
        form.email,
        form.password
      );
      try {
        // 1. Crear usuario
        const res = await fetch('http://localhost:3001/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDto)
        });
        if (!res.ok) throw new Error('Error al crear usuario');

        // 2. Buscar usuario por email
        const userRes = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(form.email)}`);
        if (!userRes.ok) throw new Error('No se pudo obtener el usuario');
        const user = await userRes.json();
        if (!user || !user.email) throw new Error('Usuario no encontrado');

        // 3. Login automático
        login(user);
        navigate('/dashboard', { replace: true });
      } catch (err: any) {
        setErrors({ confirmPassword: err.message || 'Error al crear usuario.' });
      }
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Registro</p>
        <p className="message">Registrate ahora y obtené acceso completo a PayUp.</p>
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              value={form.firstName}
              onChange={(e) => setForm(prev => ({...prev, firstName: e.target.value}))}
              required
            />
            <span>Nombre</span>
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </label>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              value={form.lastName}
              onChange={(e) => setForm(prev => ({...prev, lastName: e.target.value}))}
              required
            />
            <span>Apellido</span>
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </label>
        </div>
        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            value={form.email}
            onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
            required
          />
          <span>Email</span>
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            value={form.password}
            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
            required
          />
          <span>Contraseña</span>
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            value={form.confirmPassword}
            onChange={(e) => setForm(prev => ({...prev, confirmPassword: e.target.value}))}
            required
          />
          <span>Confirmar contraseña</span>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </label>
        <button className="submit" type="submit">Crear cuenta</button>
        <p className="signin">
          ¿Ya tenés una cuenta? <a href="#" onClick={() => navigate('/login')}>Iniciá sesión</a>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #4F46E5, #7C3AED);
  padding: 20px;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    margin-bottom: 10px;
    color: #00bfff;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #00bfff;
  }

  .message, 
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
    text-decoration: none;
    cursor: pointer;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
    width: 100%;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: calc(100% - 20px);
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  .error {
    color: #ff4444;
    font-size: 12px;
    margin-top: 4px;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default SignUpScreen;