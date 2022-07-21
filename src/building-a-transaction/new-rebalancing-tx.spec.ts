import { newRebalancingTx } from './new-rebalancing-tx';
import { ClosingAccount } from './interfaces/closing-account.interface';
import { RecipientAccount } from './interfaces/recipient-account.interface';
import { validateTransaction } from './helpers/validate-transaction';

describe('newRebalancingTx', () => {
    it('1 Closing, 1 Recipient', () => {
        const closingAccounts: ClosingAccount[] = [{ accountId: '1', amount: 100 }];
        const recipientAccounts: RecipientAccount[] = [{ accountId: '2', credit: 90 }];

        expect(newRebalancingTx(closingAccounts, recipientAccounts)).toEqual({
            transfers: [{ fromAccountId: '1', toAccountId: '2', value: 90 }],
            operationalFee: 10,
        });
    });

    it('1 Closing, 2 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [{ accountId: '1', amount: 1000 }];
        const recipientAccounts: RecipientAccount[] = [
            { accountId: '2', credit: 500 },
            { accountId: '3', credit: 400 },
        ];

        expect(newRebalancingTx(closingAccounts, recipientAccounts)).toEqual({
            transfers: [
                { fromAccountId: '1', toAccountId: '2', value: 500 },
                { fromAccountId: '1', toAccountId: '3', value: 400 },
                { fromAccountId: '1', toAccountId: null, value: 70 },
            ],
            operationalFee: 30,
        });
    });

    it('2 Closing, 1 Recipient', () => {
        const closingAccounts: ClosingAccount[] = [
            { accountId: '1', amount: 1000 },
            { accountId: '2', amount: 10 },
        ];
        const recipientAccounts: RecipientAccount[] = [{ accountId: '3', credit: 1000 }];

        expect(newRebalancingTx(closingAccounts, recipientAccounts)).toEqual({
            transfers: [{ fromAccountId: '1', toAccountId: '3', value: 1000 }],
            operationalFee: 10,
        });
    });

    it('2 Closing, 1 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [
            { accountId: '1', amount: 10 },
            { accountId: '2', amount: 1000 },
        ];
        const recipientAccounts: RecipientAccount[] = [{ accountId: '3', credit: 1000 }];

        expect(newRebalancingTx(closingAccounts, recipientAccounts)).toEqual({
            transfers: [{ fromAccountId: '2', toAccountId: '3', value: 1000 }],
            operationalFee: 10,
        });
    });

    it('3 Closing, 2 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [
            { accountId: '1', amount: 1000 },
            { accountId: '2', amount: 1000 },
            { accountId: '3', amount: 1000 },
        ];
        const recipientAccounts: RecipientAccount[] = [
            { accountId: '4', credit: 1500 },
            { accountId: '5', credit: 1400 },
        ];

        expect(() => {
            const transaction = newRebalancingTx(closingAccounts, recipientAccounts);
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).not.toThrow();
    });

    it('3 Closing, 2 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [
            // Greedy algorithm will fail if we have 830 amount here
            { accountId: '1', amount: 840 },
            { accountId: '2', amount: 500 },
            { accountId: '3', amount: 500 },
        ];
        const recipientAccounts: RecipientAccount[] = [
            { accountId: '4', credit: 1000 },
            { accountId: '5', credit: 800 },
        ];

        expect(() => {
            const transaction = newRebalancingTx(closingAccounts, recipientAccounts);
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).not.toThrow();
    });

    it('100 Closing, 100 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [];
        const recipientAccounts: RecipientAccount[] = [];

        for (let i = 0; i < 100; i++) {
            closingAccounts.push({ accountId: 'sender' + i, amount: 1000 });
            recipientAccounts.push({ accountId: 'receiver' + i, credit: 990 });
        }

        expect(() => {
            const transaction = newRebalancingTx(closingAccounts, recipientAccounts);
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).not.toThrow();
    });

    it('10 Closing, 10 Recipients', () => {
        const closingAccounts: ClosingAccount[] = [];
        const recipientAccounts: RecipientAccount[] = [];

        for (let i = 0; i < 10; i++) {
            closingAccounts.push({ accountId: 'sender' + i, amount: 1000 });
            recipientAccounts.push({ accountId: 'receiver' + i, credit: 1000 });
        }

        expect(() => {
            const transaction = newRebalancingTx(closingAccounts, recipientAccounts);
            validateTransaction(transaction, closingAccounts, recipientAccounts);
        }).toThrow();
    });

    it('Not enough funds', () => {
        const closingAccounts: ClosingAccount[] = [{ accountId: '1', amount: 100 }];
        const recipientAccounts: RecipientAccount[] = [{ accountId: '2', credit: 100 }];

        expect(() => newRebalancingTx(closingAccounts, recipientAccounts)).toThrow();
    });
});
