const axios = require("axios");

// const BASE_URL = "https://cloudflare-cms-api.kevc.workers.dev";
const BASE_URL = "http://localhost:8787";

export const getNamespaces = async (apiKey, id) => {
  const resp = await axios.get(BASE_URL + `/namespaces/${id}`, {

    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return resp.data;
};

export const postNamespaces = async (apiKey, id, name) => {
  const resp = await axios.post(
    BASE_URL + `/namespaces/${id}`,
    {
      title: name,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return resp.data;
};

export const putNamespaces = async (apiKey, accId, nsId, name) => {
  const resp = await axios.put(
    BASE_URL + `/namespaces/${accId}/${nsId}`,
    {
      title: name,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return resp.data;
};

export const deleteNamespaces = async (apiKey, accId, nsId) => {
  const resp = await axios.delete(`${BASE_URL}/namespaces/${accId}/${nsId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return resp.data;
};

export const getKeys = async (apiKey, accId, nsId) => {
  const resp = await axios.get(BASE_URL + `/namespaces/${accId}/${nsId}/keys`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return resp.data;
}