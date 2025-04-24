import React from 'react';
import { Link } from 'react-router-dom';

function History() {
  // Simulación de historial
  const payments = [
    { to: 'Juan', amount: 100, date: '2024-06-01' },
    { to: 'Ana', amount: 50, date: '2024-06-02' }
  ];

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2' }}>Historial de Pagos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payments.map((p, i) => (
          <li key={i} style={itemStyle}>
            <span>Para: <b>{p.to}</b></span>
            <span>Monto: <b>${p.amount}</b></span>
            <span style={{ color: '#1976d2' }}>{p.date}</span>
          </li>
        ))}
      </ul>
      <Link to="/dashboard" style={buttonStyle}>Volver al Dashboard</Link>
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
const itemStyle = {
  background: '#fff',
  color: '#1976d2',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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

export default History;
