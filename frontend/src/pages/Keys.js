import { useState } from "react";
import { getKeys } from "../api/cloudflare-cms-api";
const Keys = () => {
  const [result, setResult] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [accId, setAccId] = useState("");
  const [nsId, setNsId] = useState("");
  const onGet = () => {
    getKeys(apiKey, accId, nsId).then((resp) =>
      setResult(JSON.stringify(resp))
    );
  };
  return (
    <div>
      <label>Api Key</label>
      <input
        type="password"
        name="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <label>Account ID</label>
      <input
        type="text"
        name="accountID"
        value={accId}
        onChange={(e) => setAccId(e.target.value)}
      />
      <label>Namespace ID</label>
      <input
        type="text"
        name="namespaceID"
        value={nsId}
        onChange={(e) => setNsId(e.target.value)}
      />
      <button onClick={onGet}>GET</button>
      {result}
    </div>
  );
};
export default Keys;
