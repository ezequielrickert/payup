import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendPayment() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // Simulación de envío
    if (amount && to) {
      navigate('/history');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#1976d2' }}>Enviar Pago</h2>
      <form onSubmit={handleSend} style={formStyle}>
        <input
          type="text"
          placeholder="Destinatario"
          value={to}
          onChange={e => setTo(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Enviar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  background: '#fff',
  color: '#1976d2',
  padding: '2rem',
  borderRadius: '16px',
  maxWidth: 340,
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

export default SendPayment;
