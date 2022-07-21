import { ClosingAccount } from './interfaces/closing-account.interface';
import { RecipientAccount } from './interfaces/recipient-account.interface';
import { Transaction } from './interfaces/transaction.interface';
import { Transfer } from './interfaces/transfer.interface';
import { getTotalAmount } from './helpers/get-total-amount';
import { getTotalSentAmount } from './helpers/get-total-sent-amount';
import { PriorityQueue } from '@datastructures-js/priority-queue';

const TRANSFER_OPERATIONAL_FEE = 10;

/**
 * @param closingAccounts - Accounts to transfer money from
 * @param recipientAccounts - Account to transfer money to
 * Implements a greedy algorithm in order to minimize operational fee <=> amount of transfers in the transaction
 * At each step we take recipient with the largest credit required
 * And we take closing account with the largest amount available
 * Than we create a transfer between them
 * And update amount/credit left on accounts
 * Time complexity O((N+M) * log(N+M))
 * Maximal amount of transfers is N+M
 * Where N is the number of closing accounts and M is the number of recipients
 * The overall task of finding the minimal possible fee seems to be NP-hard
 * @return Transaction
 */
export const newRebalancingTx = (
    closingAccounts: ClosingAccount[],
    recipientAccounts: RecipientAccount[],
): Transaction => {
    const recipientAccountsQueue = PriorityQueue.fromArray<RecipientAccount>(
        recipientAccounts.map((account) => ({ ...account })),
        (accountA, accountB) => {
            return accountA.credit < accountB.credit ? 1 : -1;
        },
    );

    const closingAccountsQueue = PriorityQueue.fromArray<ClosingAccount>(
        closingAccounts.map((account) => ({ ...account })),
        (accountA, accountB) => {
            return accountA.amount < accountB.amount ? 1 : -1;
        },
    );

    const transfers: Transfer[] = [];

    while (!recipientAccountsQueue.isEmpty()) {
        if (closingAccountsQueue.isEmpty()) {
            throw new Error('Not enough funds for rebalance');
        }

        const recipientAccount = recipientAccountsQueue.pop();
        const closingAccount = closingAccountsQueue.pop();

        const transferValue = Math.min(recipientAccount.credit, closingAccount.amount);

        transfers.push({
            fromAccountId: closingAccount.accountId,
            toAccountId: recipientAccount.accountId,
            value: transferValue,
        });

        if (transferValue < recipientAccount.credit) {
            recipientAccountsQueue.push({
                accountId: recipientAccount.accountId,
                credit: recipientAccount.credit - transferValue,
            });
        }

        if (transferValue < closingAccount.amount) {
            closingAccountsQueue.push({
                accountId: closingAccount.accountId,
                amount: closingAccount.amount - transferValue,
            });
        }
    }

    let totalLeftAmount: number;

    if (!closingAccountsQueue.isEmpty()) {
        totalLeftAmount = closingAccountsQueue
            .toArray()
            .map((closingAccount) => closingAccount.amount)
            .reduce((a, b) => a + b);
    }

    while (!closingAccountsQueue.isEmpty()) {
        const currentOperationalFee = (transfers.length + 1) * TRANSFER_OPERATIONAL_FEE;
        if (totalLeftAmount <= currentOperationalFee) {
            break;
        }

        const closingAccount = closingAccountsQueue.pop();
        const transferValue = Math.min(closingAccount.amount, totalLeftAmount - currentOperationalFee);

        totalLeftAmount -= transferValue;
        transfers.push({ fromAccountId: closingAccount.accountId, toAccountId: null, value: transferValue });
    }

    const operationalFee = getTotalAmount(closingAccounts) - getTotalSentAmount(transfers);

    if (operationalFee < transfers.length * TRANSFER_OPERATIONAL_FEE) {
        throw new Error('Not enough funds for rebalance');
    }

    return { transfers, operationalFee };
};
