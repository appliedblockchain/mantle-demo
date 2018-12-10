# mantle-demo

### `react`

Setup: `npm start` (Application will load on `http://localhost:3001`)

Currently contains the following:

- Generate mnemonic feature (generate a random 12-word passphrase that is a human readable representation of a user account, i.e. a private/public key pair)

- Load account details by supplying a previosuly generated mnemonic

- Encryption route:
  - A UI to encrypt a message (requires a public key) and decrypt an encrypted message (requires a corresponding private key). Key pairs are supplied for the loaded account for demonstration purposes

