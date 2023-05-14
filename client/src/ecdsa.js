import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export const hexAddressFromPrivateKey = function(privateKey){
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
    return address;
};
export const sign = function (message,privateKey){
    const messageHash = keccak256(utf8ToBytes(message));
    const signedMessage = secp.secp256k1.sign(messageHash,privateKey);
    const signedMessageHex = { data: signedMessage.toCompactHex(),recovery: signedMessage.recovery};
    return signedMessageHex;
};
