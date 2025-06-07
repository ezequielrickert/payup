import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './pages/Login';
import { SignUpScreen } from './pages/SignUp';
import { DashboardScreen } from './pages/Dashboard';
import { WithdrawScreen } from './pages/Withdraw';
import { HistoryScreen } from './pages/History';
import { TransferScreen } from './pages/Transfer';
import { LoadMoneyScreen } from './pages/LoadMoney';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/withdraw" element={<WithdrawScreen />} />
        <Route path="/transfer" element={<TransferScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/load" element={<LoadMoneyScreen />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}