import { newRebalancingTx } from './new-rebalancing-tx';

const closingAccounts = JSON.parse(process.argv[2]);
const recipientAccounts = JSON.parse(process.argv[3]);

console.log(newRebalancingTx(closingAccounts, recipientAccounts));
