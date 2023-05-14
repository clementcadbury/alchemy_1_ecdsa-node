import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
      <div>
          private key (64) : ae733b98450378056e70d3590d3c9344a8afb5f5c7aeb513bb7d9646c738d0b9<br/>
          public key (66) : 03b0941f866ba3d591e14e1d4f64d054605d24518997478adfcef0673b8e23dcc9<br/>
          address (40) : 003d4c3f8edf04fc00165d062b725d1599e58c45<br/><br/>
          private key (64) : 5256430861e9dcf78115124a2def2f51e02b5ca634b45f31e300e54b2b145a0a<br/>
          public key (66) : 027998a9f7da7724f569d4328a467c02cfc7e95578266721906a756e45958e52d0<br/>
          address (40) : fab9014280a9d7d929e886cc1615907c233cd47b<br/><br/>
          private key (64) : b7789c632fe28be2158cc537799f4da4335db75251ee5fc8394e2dc2877cfc38<br/>
          public key (66) : 02e8e28c8afef2568198745a6ffae9dd95939f66a4b524f715fffb3ceb4c702904<br/>
          address (40) : 285469a789c4ca0b8b40415fb82d585bb78da331<br/><br/>
      </div>
    </div>
  );
}

export default App;
