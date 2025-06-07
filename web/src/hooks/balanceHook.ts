import { useState, useEffect } from 'react';

export function fetchBalance(cvu?: number) {
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        if (!cvu) return;

        const fetchWallet = async () => {
            try {
                const response = await fetch(`http://localhost:3001/wallet/${cvu}`);
                if (!response.ok) {
                    throw new Error('Error fetching wallet');
                }
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching wallet:', error);
            }
        };

        fetchWallet();
    }, [cvu]);

    return { balance, setBalance };
}