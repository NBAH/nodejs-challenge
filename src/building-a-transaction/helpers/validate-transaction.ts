import { Transaction } from '../interfaces/transaction.interface';
import { ClosingAccount } from '../interfaces/closing-account.interface';
import { RecipientAccount } from '../interfaces/recipient-account.interface';
import { getTotalAmount } from './get-total-amount';
import { getTotalSentAmount } from './get-total-sent-amount';

export const validateTransaction = (
    transaction: Transaction,
    closingAccounts: ClosingAccount[],
    recipientAccounts: RecipientAccount[],
): void => {
    const closingAccountsAmount = new Map<string, number>();
    const recipientAccountsCredit = new Map<string, number>();

    const totalAmount = getTotalAmount(closingAccounts);
    const totalSentAmount = getTotalSentAmount(transaction.transfers);

    closingAccounts.forEach((account) => {
        closingAccountsAmount.set(account.accountId, 0);
    });

    recipientAccounts.forEach((account) => {
        recipientAccountsCredit.set(account.accountId, 0);
    });

    recipientAccountsCredit.set(null, 0);

    transaction.transfers.forEach((transfer) => {
        if (transfer.value <= 0) {
            throw new Error('Transfer value must be greater than zero');
        }

        const closingAccountAmount = closingAccountsAmount.get(transfer.fromAccountId);
        if (closingAccountAmount === undefined) {
            throw new Error(`Account not exists in closingAccounts: ${transfer.fromAccountId}`);
        }
        closingAccountsAmount.set(transfer.fromAccountId, closingAccountAmount + transfer.value);

        const recipientAccountCredit = recipientAccountsCredit.get(transfer.toAccountId);
        if (recipientAccountCredit === undefined) {
            throw new Error(`Account not exists in recipientAccounts: ${transfer.toAccountId}`);
        }
        recipientAccountsCredit.set(transfer.toAccountId, recipientAccountCredit + transfer.value);
    });

    closingAccounts.forEach((account) => {
        if (closingAccountsAmount.get(account.accountId) > account.amount) {
            throw new Error(`Account can't have less than 0 balance`);
        }
    });

    recipientAccounts.forEach((account) => {
        if (recipientAccountsCredit.get(account.accountId) < account.credit) {
            throw new Error(`Recipient got less money than expected`);
        }
    });

    const expectedOperationalFee = totalAmount - totalSentAmount;

    if (expectedOperationalFee !== transaction.operationalFee) {
        throw new Error(
            `Operational fee mismatch. Expected: ${expectedOperationalFee} Got: ${transaction.operationalFee}`,
        );
    }
};
