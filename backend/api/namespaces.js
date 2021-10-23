const BASE_URL = 'https://api.cloudflare.com/client/v4/accounts/'
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}
export const getNamespaces = async request => {
    const accountId = request.params.accountId
    const apiKey = request.headers.get('Authorization')

    const resp = await fetch(BASE_URL + accountId + '/storage/kv/namespaces', {
        headers: {
            Authorization: apiKey,
        },
    }).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

/*
{
    "title": "My Namespace"
}
*/
export const postNamespaces = async request => {
    const accountId = request.params.accountId
    const data = await request.json()
    const apiKey = request.headers.get('Authorization')

    const resp = await fetch(BASE_URL + accountId + '/storage/kv/namespaces', {
        method: 'POST',
        headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

/*
{
    "title": "My Namespace"
}
*/
export const putNamespaces = async request => {
  const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const apiKey = request.headers.get('Authorization')
    const data = await request.json()

    const resp = await fetch(
        BASE_URL + accountId + '/storage/kv/namespaces/' + namespaceId,
        {
            method: 'PUT',
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    ).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

export const deleteNamespaces = async request => {
  const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const apiKey = request.headers.get('Authorization')
    const resp = await fetch(
        BASE_URL + accountId + '/storage/kv/namespaces/' + namespaceId,
        {
            method: 'DELETE',
            headers: {
                Authorization: apiKey,
            },
        }
    ).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}