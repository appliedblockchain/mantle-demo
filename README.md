# mantle-demo

What is mantle-demo?

An example app highlighting how to use Mantle's asymmetric and symmetric encryption/decryption capabilities, mnemonic/account generation and management, and more.

## Features
- React frontend responsible for encrypting data, generating user accounts and communicating with API
- API component responsible for communicating with our blockchain via web3 and storing contract information
- Contract component reponsible for compilation and deployment of "Notes" and "Users" contracts

## Setup

#### `Local`

To set up the demo locally, perform the following actions:

#### From /api:

> `npm i`

#### From /contracts:

> `npm i` \
> `npm run compile` \
> `npm run parity` \
> `npm run deploy` (Deploys contracts to your running parity node)

#### From /react:

> `npm i`

#### From project root(/):

> `npm i` \
> `npm start`

The API server will start on port 3000 and react app on port 3001

Available API routes:


```js
GET http://localhost:3000/api/users
GET http://localhost:3000/api/notes
POST http://localhost:3000/api/notes
```