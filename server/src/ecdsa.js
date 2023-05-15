const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex,utf8ToBytes,hexToBytes } = require("ethereum-cryptography/utils");

/**
 * @argument publicKey hex String
 * @argument data String
 * @argument signature { data , recovery }
 */
module.exports.verifySignature = function (publicKey,data,signature){
    const messageHash = keccak256(utf8ToBytes(data));
    const signatureVerified = secp.secp256k1.verify(signature.data,messageHash,publicKey);
    return signatureVerified;
};

module.exports.hexAddressFromPublicKey = function (_publicKey){
    const publicKey = typeof _publicKey === 'string' ? hexToBytes(_publicKey) : _publicKey;

    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
    return address;
};