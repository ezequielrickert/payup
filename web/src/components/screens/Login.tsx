import React, { useState } from 'react';
import styled from 'styled-components';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSwitchToRegister
}) => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userDto = {
          email: form.email,
          password: form.password,
        };
        const response = await fetch('http://localhost:3001/users', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userDto)
        });
        if (!response.ok) throw new Error('Error al crear usuario');
        onLogin(form.email, form.password);
      } catch (error) {
        setErrors({password: 'No se pudo crear el usuario'});
      }
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Iniciar Sesión</p>
        <p className="message">Bienvenido de vuelta a tu billetera digital PayUp.</p>

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

        <button className="submit" type="submit">Iniciar Sesión</button>
        <p className="signin">
          ¿No tenés cuenta? <a href="#" onClick={onSwitchToRegister}>Registrate</a>
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
  padding: 10px;

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
    left: 0px;
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
    top: 0px;
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
    top: 0px;
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

export default LoginScreen;