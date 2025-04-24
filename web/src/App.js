import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import SendPayment from './views/SendPayment';
import History from './views/History';

function HomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '14px 32px',
        fontWeight: 'bold',
        fontSize: 16,
        boxShadow: '0 2px 8px rgba(25,118,210,0.15)',
        cursor: 'pointer',
        zIndex: 1000
      }}
    >
      Inicio
    </button>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendPayment />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        <HomeButton />
      </div>
    </Router>
  );
}

export default App;
