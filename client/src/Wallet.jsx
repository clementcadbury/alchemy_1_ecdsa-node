import server from "./server";
import { hexAddressFromPrivateKey } from './ecdsa';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    let address;
    try {
      address = hexAddressFromPrivateKey(privateKey);
    } catch {
      address = "";
    }

    setPrivateKey(privateKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Your private key, for example: 0x1" value={privateKey} onChange={onChange} ></input>
      </label>
      <div>Address : {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
