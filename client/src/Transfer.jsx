import { useState } from "react";
import server from "./server";
import { sign } from './ecdsa';

function Transfer({ privateKey, address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    let sendData = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };

    const message = JSON.stringify(sendData);
    sendData.signature = sign(message,privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, sendData);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient Address
        <input
          placeholder="Type an address, for example: 25a2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
