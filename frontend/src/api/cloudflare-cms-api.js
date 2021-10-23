const axios = require("axios");

const BASE_URL = "https://cloudflare-cms-api.kevc.workers.dev";

export const getNamespaces = async (apiKey, id) => {
  const resp = await axios.get(BASE_URL + `/namespaces/${id}`, {
    params: {
      apiKey: `Bearer ${apiKey}`,
    },
  });
  return resp.data;
};
