const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

const message = "coucou";
const messageHash = keccak256(utf8ToBytes(message));
const signedMessage = secp.secp256k1.sign(messageHash,privateKey);

const recoveredPublicKey = signedMessage.recoverPublicKey(messageHash).toRawBytes();
const recoveredAddress = keccak256(recoveredPublicKey.slice(1)).slice(-20);

const publicKeyMatch = toHex(publicKey) === toHex(recoveredPublicKey);
const addressMatch = toHex(address) === toHex(recoveredAddress);

const signatureVerified = secp.secp256k1.verify(signedMessage,messageHash,recoveredPublicKey);


console.log("private key (" + privateKey.length*2 + ") : " + '0x' + toHex(privateKey));
console.log("public key (" + publicKey.length*2 + ") : " + '0x' + toHex(publicKey));
console.log("address (" + address.length*2 + ") : " + '0x' + toHex(address));
console.log("");
console.log("recovered public key (" + recoveredPublicKey.length*2 + ") : " + '0x' + toHex(recoveredPublicKey));
console.log("recovered address (" + recoveredAddress.length*2 + ") : " + '0x' + toHex(recoveredAddress));
console.log("");
console.log("recovered public key match : " + publicKeyMatch + " , recovered address match : " + addressMatch + " , sign verified : " + signatureVerified);