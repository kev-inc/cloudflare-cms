import { useState } from "react";
import { getNamespaces } from "../api/cloudflare-cms-api";

const Namespaces = () => {
  const [result, setResult] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    getNamespaces(e.target.apiKey.value, e.target.accountID.value).then(
      (resp) => setResult(JSON.stringify(resp))
    );
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Api Key</label>
        <input type="password" name="apiKey" />
        <label>Account ID</label>
        <input type="text" name="accountID" />
        <input type="submit" />
      </form>
      {result}
    </div>
  );
};

export default Namespaces;
