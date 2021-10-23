const BASE_URL = 'https://api.cloudflare.com/client/v4/accounts/'
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}
export const getKeys = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const apiKey = request.headers.get('Authorization')

    const resp = await fetch(
        `${BASE_URL + accountId}/storage/kv/namespaces/${namespaceId}/keys`,
        {
            headers: {
                Authorization: apiKey,
            },
        }
    ).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

/*
{
    "title": "My New Key"
}
*/
export const postNewKey = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const apiKey = request.headers.get('Authorization')
    const data = await request.json()
    const keyName = data['title']
    const resp = await fetch(
        `${BASE_URL +
            accountId}/storage/kv/namespaces/${namespaceId}/values/${keyName}`,
        {
            method: 'PUT',
            headers: {
                Authorization: apiKey,
                'Content-Type': 'text/plain',
            },
            body: '[]',
        }
    ).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}
