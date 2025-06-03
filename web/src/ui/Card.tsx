import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface CardProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'surface';
    onClick?: () => void;
    className?: string;
    padding?: keyof typeof theme.spacing;
}

export const Card: React.FC<CardProps> = ({ 
    children, 
    variant = 'surface',
    onClick,
    className,
    padding = 'lg'
}) => {
    return (
        <StyledCard 
            className={`${className} ${variant}`}
            onClick={onClick}
            clickable={!!onClick}
            $padding={padding}
        >
            {children}
        </StyledCard>
    );
};

const StyledCard = styled.div<{ clickable: boolean; $padding: keyof typeof theme.spacing }>`
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.lg};
    padding: ${props => theme.spacing[props.$padding]};
    transition: all 0.3s ease;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text.primary};
    
    &.primary {
        background: ${theme.colors.primary.gradient};
        border: none;
        color: ${theme.colors.text.inverse};
    }
    
    &.secondary {
        background: ${theme.colors.surfaceHover};
    }
    
    ${props => props.clickable && `
        cursor: pointer;
        &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
            background: ${props.className?.includes('primary') ? 
                theme.colors.primary.gradient : 
                theme.colors.surfaceHover
            };
        }
        
        &:active {
            transform: translateY(0);
        }
    `}

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: ${props => 
            props.$padding === 'lg' ? theme.spacing.md :
            props.$padding === 'xl' ? theme.spacing.lg :
            theme.spacing[props.$padding]
        };
        border-radius: ${theme.borderRadius.md};
    }
`; 