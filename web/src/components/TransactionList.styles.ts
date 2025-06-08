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
        text-align: center;
        padding: 48px 0;

        .icon {
            width: 48px;
            height: 48px;
            color: ${theme.colors.text.secondary};
            margin: 0 auto 16px;
        }

        .message {
            color: ${theme.colors.text.primary};
            font-weight: 500;
            margin-bottom: 8px;
        }

        .submessage {
            color: ${theme.colors.text.secondary};
            font-size: 14px;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`; 