import { ClosingAccount } from '../interfaces/closing-account.interface';

export const getTotalAmount = (closingAccounts: ClosingAccount[]): number => {
    return closingAccounts.map((closingAccount) => closingAccount.amount).reduce((a, b) => a + b);
};
