import { useState } from "react";
import {
  getNamespaces,
  postNamespaces,
  putNamespaces,
  deleteNamespaces,
} from "../api/cloudflare-cms-api";

const Namespaces = () => {
  const [result, setResult] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [accId, setAccId] = useState("");
  const [nsId, setNsId] = useState("");
  const [nsName, setNsName] = useState("");

  const onGet = () => {
    getNamespaces(apiKey, accId).then((resp) =>
      setResult(JSON.stringify(resp))
    );
  };
  const onPost = () => {
    postNamespaces(apiKey, accId, nsName).then((resp) =>
      setResult(JSON.stringify(resp))
    );
  };
  const onPut = () => {
    putNamespaces(apiKey, accId, nsId, nsName).then((resp) =>
      setResult(JSON.stringify(resp))
    );
  };
  const onDel = () => {
    deleteNamespaces(apiKey, accId, nsId).then((resp) =>
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
      <label>Namespace Name</label>
      <input
        type="text"
        name="namespaceName"
        value={nsName}
        onChange={(e) => setNsName(e.target.value)}
      />
      <button onClick={onGet}>GET</button>
      <button onClick={onPost}>POST</button>
      <button onClick={onPut}>PUT</button>
      <button onClick={onDel}>DELETE</button>
      {result}
    </div>
  );
};

export default Namespaces;
