import { Transfer } from './transfer.interface';

export interface Transaction {
    transfers: Transfer[];
    operationalFee: number;
}
