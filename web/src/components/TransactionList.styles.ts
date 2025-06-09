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