import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2' }}>Dashboard</h2>
      <p>Resumen de tu cuenta y acciones rápidas.</p>
      <div style={{ marginTop: 24 }}>
        <Link to="/send" style={buttonStyle}>Enviar Pago</Link>
        <Link to="/history" style={{ ...buttonStyle, background: '#fff', color: '#1976d2', marginLeft: 16 }}>Ver Historial</Link>
      </div>
    </div>
  );
}

const containerStyle = {
  background: 'linear-gradient(135deg, #1976d2 60%, #fff 100%)',
  color: '#fff',
  minHeight: '60vh',
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(25, 118, 210, 0.1)'
};
const buttonStyle = {
  background: '#1976d2',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
};

export default Dashboard;
