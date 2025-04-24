import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1976d2 60%, #fff 100%)',
      color: '#fff',
      minHeight: '80vh',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.1)'
    }}>
      <h1>Bienvenido a PayUp</h1>
      <p>Gestiona tus pagos de manera sencilla y segura.</p>
      <div style={{ marginTop: 32 }}>
        <Link to="/login" style={buttonStyle}>Iniciar Sesión</Link>
        <Link to="/dashboard" style={{ ...buttonStyle, background: '#fff', color: '#1976d2', marginLeft: 16 }}>Ir al Dashboard</Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: '#1976d2',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
};

export default Home;
