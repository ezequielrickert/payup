import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { theme } from '../styles/theme';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
    console.log('Header props:', { showBack, onBack }); // Debug log
    return (
        <StyledHeader>
            {showBack && (
                <BackButton onClick={onBack} type="button">
                    <ChevronLeft size={24} />
                </BackButton>
            )}
            <Title>{title}</Title>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    width: 100%;
    box-sizing: border-box;
    height: 72px;

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: 16px 20px;
        height: 64px;
    }
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #222 !important;
    border: 1px solid #333 !important;
    border-radius: 50% !important;
    color: #fff !important;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0 !important;
    margin: 0 !important;
    min-width: 40px !important;
    min-height: 40px !important;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    &:hover {
        background: #2a2a2a !important;
        border-color: #444 !important;
    }

    svg {
        width: 24px;
        height: 24px;
        color: #fff;
    }
`;

const Title = styled.h1`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    flex: 1;
    text-align: center;
    line-height: 1.2;

    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: 18px;
    }
`;