const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const wei = require("@noble/curves/abstract/weierstrass");

/**
 * @argument data String
 * @argument signature { data , recovery }
 */
module.exports.verifySignature = function (data,signature){
    const messageHash = keccak256(utf8ToBytes(data));
    const resignedObj = wei.weierstrass(secp.secp256k1.CURVE).Signature.fromCompact(signature.data).addRecoveryBit(signature.recovery);
    const recoveredPublicKey = resignedObj.recoverPublicKey(messageHash).toRawBytes();
    const signatureVerified = secp.secp256k1.verify(resignedObj,messageHash,recoveredPublicKey);
    return signatureVerified;
}
