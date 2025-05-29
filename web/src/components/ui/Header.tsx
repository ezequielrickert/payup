import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
    return (
        <StyledHeader>
            {showBack && (
                <BackButton onClick={onBack}>
                    <ChevronLeft className="icon" />
                </BackButton>
            )}
            <Title>{title}</Title>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 10; /* Asegura que el Header esté por encima de otros elementos */
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #222;
    border: 1px solid #333;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #2a2a2a;
    }

    .icon {
        width: 20px;
        height: 20px;
    }
`;

const Title = styled.h1`
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    flex: 1; /* Permite que el título ocupe el espacio restante */
    text-align: center; /* Centra el título si no hay otros elementos */
`;