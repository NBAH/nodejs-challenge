import { Transaction } from '../interfaces/transaction.interface';
import { ClosingAccount } from '../interfaces/closing-account.interface';
import { RecipientAccount } from '../interfaces/recipient-account.interface';
import { validateTransaction } from './validate-transaction';

describe('validateTransaction', () => {
    const closingAccounts: ClosingAccount[] = [
        { accountId: '1', amount: 500 },
        { accountId: '2', amount: 1000 },
        { accountId: '3', amount: 1000 },
    ];
    const recipientAccounts: RecipientAccount[] = [
        { accountId: '4', credit: 500 },
        { accountId: '5', credit: 700 },
        { accountId: '6', credit: 1000 },
    ];

    it('Should succeed', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '1', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 700 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '2', toAccountId: null, value: 260 },
            ],
            operationalFee: 40,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).not.toThrow();
    });

    it('Should succeed', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '2', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 500 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '1', toAccountId: '5', value: 200 },
                { fromAccountId: '1', toAccountId: null, value: 250 },
            ],
            operationalFee: 50,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).not.toThrow();
    });

    it('Recipient got less money than expected', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '2', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 500 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '1', toAccountId: null, value: 200 },
                { fromAccountId: '1', toAccountId: null, value: 250 },
            ],
            operationalFee: 50,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).toThrow();
    });

    it('Incorrect operational fee', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '2', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 500 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '1', toAccountId: '5', value: 200 },
                { fromAccountId: '1', toAccountId: null, value: 250 },
            ],
            operationalFee: 60,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).toThrow();
    });

    it('Unknown recipient account', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '2', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 500 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '1', toAccountId: '7', value: 200 },
                { fromAccountId: '1', toAccountId: null, value: 250 },
            ],
            operationalFee: 50,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).toThrow();
    });

    it('Zero transfer value', () => {
        const transaction: Transaction = {
            transfers: [
                { fromAccountId: '2', toAccountId: '4', value: 500 },
                { fromAccountId: '2', toAccountId: '5', value: 500 },
                { fromAccountId: '3', toAccountId: '6', value: 1000 },
                { fromAccountId: '1', toAccountId: '5', value: 200 },
                { fromAccountId: '1', toAccountId: null, value: 0 },
            ],
            operationalFee: 300,
        };
        expect(() => {
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).toThrow();
    });
});
