import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de login
    if (user && pass) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2' }}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Entrar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  background: '#fff',
  color: '#1976d2',
  padding: '2rem',
  borderRadius: '16px',
  maxWidth: 320,
  margin: '3rem auto',
  boxShadow: '0 4px 16px rgba(25, 118, 210, 0.1)'
};
const formStyle = { display: 'flex', flexDirection: 'column', gap: 16 };
const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #1976d2',
  marginBottom: 8
};
const buttonStyle = {
  background: '#1976d2',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Login;
