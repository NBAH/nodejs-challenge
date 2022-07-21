# nodejs-challenge

#### Project setup

1) Install node v14+

2) Run `npm i` in the root directory

3) Run `npm run setup` to setup pre-commit linting hook

#### Testing
Run `npm run test` to test the code via jest

Test coverage can be collected via `npm run test -- --coverage`

## Tasks

#### 1. Permutations
Solution is located at src/permutations/

It can be tested via `ts-node src/permutations/main.ts *10`

Example input:
```javascript
ts-node src/permutations/main.ts *10**
```

Example output:
```javascript
[
  '01000', '11000',
  '01010', '11010',
  '01001', '11001',
  '01011', '11011'
]
```


#### 2. Data-model
Solution is located at src/data-model/

It can be tested via `ts-node src/data-model/main.ts`


#### 3. Building a transaction
Solution is located at src/building-a-transaction

It can be tested via `ts-node src/building-a-transaction/main.ts "[{\"accountId\": \"1\", \"amount\": 100}]" "[{\"accountId\": \"2\", \"credit\": 70}]"`

Example input:
```javascript
ts-node src/building-a-transaction/main.ts "[{\"accountId\": \"1\", \"amount\": 100}]" "[{\"accountId\": \"2\", \"credit\": 70}]"
```

Example output:
```javascript
{
  transfers: [
    { fromAccountId: '1', toAccountId: '2', value: 70 },
    { fromAccountId: '1', toAccountId: null, value: 10 }
  ],
  operationalFee: 20
}
```
