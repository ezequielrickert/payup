import styled from 'styled-components';
import { theme } from '../styles/theme';

export const StyledTransactionList = styled.div`
    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .transaction-item {
        display: flex;
        align-items: center;
        padding: 16px;
        background: ${theme.colors.surface};
        border: 1px solid ${theme.colors.border};
        border-radius: 12px;
        transition: background-color 0.2s;

        &:hover {
            background: ${theme.colors.surfaceHover};
        }
    }

    .transaction-info {
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 1;
        min-width: 0;
    }
    
    // no borrar aunque diga que no se está utilizando porque si lo usa
    .icon-container {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${theme.colors.surfaceHover};

        &.self .icon {
            color: #00bfff;
        }

        &.received .icon {
            color: #00e676;
        }

        &.sent .icon {
            color: #ff1744;
        }
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        text-align: left;

        .cvu-display {
            color: ${theme.colors.text.primary};
            font-weight: 500;
            margin-bottom: 4px;
        }

        .description {
            color: ${theme.colors.text.secondary};
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
        }
    }

    .amount {
        font-weight: 600;
        font-size: 16px;
        margin-left: 16px;
        white-space: nowrap;

        // No borrar aunque diga que no se utilizan porque si los usa
        &.self {
            color: #00bfff;
        }
        &.received {
            color: #00e676;
        }
        &.sent {
            color: #ff1744;
        }
    }

    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        gap: 16px;

        .icon {
            width: 48px;
            height: 48px;
            color: ${theme.colors.primary.main};
            animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
            opacity: 0.8;
        }

        .message {
            font-size: 18px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes pulse {
            0% {
                opacity: 0.6;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0.6;
            }
        }
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        gap: 16px;

        .icon {
            width: 48px;
            height: 48px;
            color: rgba(255, 255, 255, 0.4);
        }

        .message {
            font-size: 18px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
        }

        .submessage {
            font-size: 14px;
            color: #00bfff;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;
