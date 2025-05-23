import React, { useState } from 'react';
import AppProvider from './context/AppContext.tsx';
import { DashboardScreen } from './components/screens/Dashboard.tsx';
import { LoadMoneyScreen } from './components/screens/LoadMoney.tsx';
import { TransferScreen } from './components/screens/Transfer.tsx';
import { WithdrawScreen } from './components/screens/Withdraw.tsx';
import { HistoryScreen } from './components/screens/History.tsx';
import { LoginScreen } from './components/screens/Login.tsx';
import SignUpScreen from './components/screens/SignUp.tsx';
import { useApp } from './context/AppContext.tsx';

type Screen = 'login' | 'signup' | 'dashboard' | 'load' | 'transfer' | 'withdraw' | 'history';

const AppContent: React.FC = () => {
    const {
        isAuthenticated,
        user,
        transactions,
        showBalance,
        toggleBalance,
        login,
        logout,
        register,
        loadMoney,
        transfer,
        withdraw
    } = useApp();

    const [currentScreen, setCurrentScreen] = useState<Screen>(isAuthenticated ? 'dashboard' : 'login');

    // Auth handlers
    const handleLogin = async (email: string, password: string) => {
        await login(email, password);
        setCurrentScreen('dashboard');
    };

    const handleRegister = async (email: string, password: string) => {
        await register(email, password);
        setCurrentScreen('dashboard');
    };

    const handleLogout = () => {
        logout();
        setCurrentScreen('login');
    };

    // Money action handlers
    const handleLoadMoney = async (amount: number, method: 'card' | 'bank' | 'debin') => {
        await loadMoney(amount, method);
        setCurrentScreen('dashboard');
    };

    const handleTransfer = async (recipient: string, amount: number, description: string) => {
        await transfer(recipient, amount, description);
        setCurrentScreen('dashboard');
    };

    const handleWithdraw = async (amount: number, bankAccount: string) => {
        await withdraw(amount, bankAccount);
        setCurrentScreen('dashboard');
    };

    if (!isAuthenticated) {
        if (currentScreen === 'signup') {
            return (
                <SignUpScreen
                    onSignUp={handleRegister}
                    onSwitchToRegister={() => setCurrentScreen('login')}
                />
            );
        }

        return (
            <LoginScreen
                onLogin={handleLogin}
                onSwitchToRegister={() => setCurrentScreen('signup')}
            />
        );
    }

    if (!user) return null;

    switch (currentScreen) {
        case 'dashboard':
            return (
                <DashboardScreen
                    user={user}
                    transactions={transactions}
                    showBalance={showBalance}
                    onToggleBalance={toggleBalance}
                    onNavigate={setCurrentScreen}
                    onLogout={handleLogout}
                />
            );

        case 'load':
            return (
                <LoadMoneyScreen
                    user={user}
                    onLoadMoney={handleLoadMoney}
                    onNavigateBack={() => setCurrentScreen('dashboard')}
                />
            );

        case 'transfer':
            return (
                <TransferScreen
                    user={user}
                    onTransfer={handleTransfer}
                    onNavigateBack={() => setCurrentScreen('dashboard')}
                />
            );

        case 'withdraw':
            return (
                <WithdrawScreen
                    user={user}
                    onWithdraw={handleWithdraw}
                    onBack={() => setCurrentScreen('dashboard')}
                />
            );

        case 'history':
            return (
                <HistoryScreen
                    transactions={transactions}
                    onBack={() => setCurrentScreen('dashboard')}
                />
            );

        default:
            return null;
    }
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App; 