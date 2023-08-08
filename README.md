# solidity.io code challange

Simple nestjs app that uses ethers.js to interact with a smart contract.

It listens to events coming from the smart contract and forwards them through the websocket.

## Requirements

In order to run this app you need to have to deploy smart contract to a testnet and have the address of the deployed contract.

How to do that can be found in `smart-contract/README.md`.

## Configuration

To configure server which smart contract to listen to, you need to configure the following environment variables:

```bash
WALLET_PRIVATE_KEY=
NODE_RPC_URL=
```

After that you need to add smart contract config in `smart-contracts-events-config` service.

```
{
  name: 'SimpleStorage2',
  address: '0x0d4b13ab292c7E6A43f9616f6beFD39Be1a569eD',
  rpc_url: this.configService.get<string>('NODE_RPC_URL'),
  wallet_pk: this.configService.get<string>('WALLET_PRIVATE_KEY'),
  abi: SimpleStorageAbi.abi,
  events: ['DataChanged'],
}
```

## Running the app

First install node modules:

```bash
$ yarn install
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Test websocket

To test websocket simpler I've created a simple html page that connects to the websocket and logs the events.

To test it, open `util/ws-test.html` in your browser. New data will appear in the console.

## License

Nest is [MIT licensed](LICENSE).
