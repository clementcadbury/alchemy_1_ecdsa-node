const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const wei = require("@noble/curves/abstract/weierstrass");

/*****  client side  ******/

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

const message = "coucou";
const messageHash = keccak256(utf8ToBytes(message));
const signedMessage = secp.secp256k1.sign(messageHash,privateKey);

const signedMessageHex = { signature: signedMessage.toCompactHex(),recovery: signedMessage.recovery};
//console.log(signedMessageHex);

/*****  transmission : message,  signedMessageHex ******/

/*****  server side  ******/

const resignedObj = wei.weierstrass(secp.secp256k1.CURVE).Signature.fromCompact(signedMessageHex.signature).addRecoveryBit(signedMessageHex.recovery);
//console.log(resignedObj);

const recoveredPublicKey = resignedObj.recoverPublicKey(messageHash).toRawBytes();
const recoveredAddress = keccak256(recoveredPublicKey.slice(1)).slice(-20);

const publicKeyMatch = toHex(publicKey) === toHex(recoveredPublicKey);
const addressMatch = toHex(address) === toHex(recoveredAddress);

const signatureVerified = secp.secp256k1.verify(resignedObj,messageHash,recoveredPublicKey);


console.log("private key (" + privateKey.length*2 + ") : " + toHex(privateKey));
console.log("public key (" + publicKey.length*2 + ") : " + toHex(publicKey));
console.log("address (" + address.length*2 + ") : " + toHex(address));
console.log("");
console.log("signature : " + signedMessageHex);
console.log("");
console.log("recovered public key (" + recoveredPublicKey.length*2 + ") : " + toHex(recoveredPublicKey));
console.log("recovered address (" + recoveredAddress.length*2 + ") : " + toHex(recoveredAddress));
console.log("");
console.log("recovered public key match : " + publicKeyMatch + " , recovered address match : " + addressMatch + " , sign verified : " + signatureVerified);
