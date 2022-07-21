import { Transfer } from '../interfaces/transfer.interface';

export const getTotalSentAmount = (transfers: Transfer[]): number => {
    return transfers.map((transfer) => transfer.value).reduce((a, b) => a + b);
};
