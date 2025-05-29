import React from 'react';
import styled from 'styled-components';
import { Loader } from 'lucide-react';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    fullWidth = false,
    disabled,
    className = '',
    ...props
}) => {
    return (
        <StyledButton
            className={`${variant} ${size} ${className}`}
            disabled={disabled || isLoading}
            $fullWidth={fullWidth}
            {...props}
        >
            {isLoading ? (
                <Loader className="animate-spin" />
            ) : (
                <>
                    {icon && <span className="icon">{icon}</span>}
                    {children}
                </>
            )}
        </StyledButton>
    );
};

const StyledButton = styled.button<{ $fullWidth: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    font-weight: 500;
    border-radius: ${theme.borderRadius.md};
    transition: all 0.2s ease;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &.primary {
        background: ${theme.colors.primary.gradient};
        color: ${theme.colors.text.inverse};
        border: none;
        
        &:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
        }
        
        &:active:not(:disabled) {
            transform: translateY(0);
        }
    }

    &.secondary {
        background: ${theme.colors.secondary.main};
        color: ${theme.colors.text.inverse};
        border: none;
        
        &:hover:not(:disabled) {
            background: ${theme.colors.secondary.dark};
        }
    }

    &.outline {
        background: transparent;
        border: 1px solid ${theme.colors.border};
        color: ${theme.colors.text.primary};
        
        &:hover:not(:disabled) {
            background: ${theme.colors.surfaceHover};
        }
    }

    &.ghost {
        background: transparent;
        border: none;
        color: ${theme.colors.text.primary};
        
        &:hover:not(:disabled) {
            background: ${theme.colors.surfaceHover};
        }
    }

    &.sm {
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: 14px;
        
        .icon {
            width: 16px;
            height: 16px;
        }
    }

    &.md {
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 16px;
        
        .icon {
            width: 20px;
            height: 20px;
        }
    }

    &.lg {
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: 18px;
        
        .icon {
            width: 24px;
            height: 24px;
        }
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        &.sm {
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
            font-size: 12px;
        }

        &.md {
            padding: ${theme.spacing.xs} ${theme.spacing.md};
            font-size: 14px;
        }

        &.lg {
            padding: ${theme.spacing.sm} ${theme.spacing.md};
            font-size: 16px;
        }
    }
`; 