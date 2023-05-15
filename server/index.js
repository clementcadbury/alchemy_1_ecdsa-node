const { verifySignature,hexAddressFromPublicKey } = require("./src/ecdsa");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

/*
private key (64) : ae733b98450378056e70d3590d3c9344a8afb5f5c7aeb513bb7d9646c738d0b9  
public key (66) : 03b0941f866ba3d591e14e1d4f64d054605d24518997478adfcef0673b8e23dcc9 
address (40) : 003d4c3f8edf04fc00165d062b725d1599e58c45

private key (64) : 5256430861e9dcf78115124a2def2f51e02b5ca634b45f31e300e54b2b145a0a  
public key (66) : 027998a9f7da7724f569d4328a467c02cfc7e95578266721906a756e45958e52d0 
address (40) : fab9014280a9d7d929e886cc1615907c233cd47b

private key (64) : b7789c632fe28be2158cc537799f4da4335db75251ee5fc8394e2dc2877cfc38
public key (66) : 02e8e28c8afef2568198745a6ffae9dd95939f66a4b524f715fffb3ceb4c702904
address (40) : 285469a789c4ca0b8b40415fb82d585bb78da331
*/

const balances = {
  "003d4c3f8edf04fc00165d062b725d1599e58c45": 100,
  "fab9014280a9d7d929e886cc1615907c233cd47b": 50,
  "285469a789c4ca0b8b40415fb82d585bb78da331": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { publicKey, recipient, amount , signature } = req.body;

  const sentData = {
    publicKey: publicKey,
    amount: parseInt(amount),
    recipient,
  };

  const message = JSON.stringify(sentData);
  
  const signatureVerified = verifySignature(publicKey,message,signature);

  if ( signatureVerified ) {
    const sender = hexAddressFromPublicKey(publicKey);

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Signature not verified!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
