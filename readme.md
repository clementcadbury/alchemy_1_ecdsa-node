# ECDSA Node - Alchemy Ethereum Dev Bootcamp Week 1 project

## Client side modifications

- src/App.jsx : added privateKey state variable and setter
- src/ecdsa.js : putting the sign and hexAddressFromPrivateKey function in a separate file
- src/Transfer.jsx : modifying the transfer function to send signed message with privateKey
- src/Wallet.jsx : input is now the private key, derived address is shown

## Server side modifications

- scripts/generate.js : generate a private/public key pair and the derived address, sign a message, recover public key and address and verify signature
- src/ecdsa.js : function verifySignature in a separate file
- index.js : balances array modified with values from scripts/generate.js, send route gets signature and transfer only if signature is valid

## Usage

Use NPM in node.js :

```bash
# server, uses nodemon
cd server
npm install
npm run dev

# client
cd client
npm install
npm run dev
```