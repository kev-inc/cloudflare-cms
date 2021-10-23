const BASE_URL = 'https://api.cloudflare.com/client/v4/accounts/'
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

const getData = (apiKey, accountId, namespaceId, keyName) => {
    return fetch(
        `${BASE_URL +
            accountId}/storage/kv/namespaces/${namespaceId}/values/${keyName}`,
        {
            headers: {
                Authorization: apiKey,
            },
        }
    ).then(resp => resp.json())
}

const putData = (apiKey, accountId, namespaceId, keyName, toPut) => {
    return fetch(
        `${BASE_URL +
            accountId}/storage/kv/namespaces/${namespaceId}/values/${keyName}`,
        {
            method: 'PUT',
            headers: {
                Authorization: apiKey,
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(toPut),
        }
    ).then(resp => resp.json())
}

export const getValues = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const keyName = request.params.keyName
    const apiKey = request.headers.get('Authorization')

    const resp = await getData(apiKey, accountId, namespaceId, keyName)
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

export const postNewValue = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const keyName = request.params.keyName
    const apiKey = request.headers.get('Authorization')
    const toAdd = await request.json()
    toAdd['id'] = crypto.randomUUID()
    const curr = await getData(apiKey, accountId, namespaceId, keyName)
    curr.push(toAdd)
    const resp = await putData(apiKey, accountId, namespaceId, keyName, curr)
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

export const getValue = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const keyName = request.params.keyName
    const itemId = request.params.itemId
    const apiKey = request.headers.get('Authorization')
    const curr = await getData(apiKey, accountId, namespaceId, keyName)
    const item = curr.find(item => item['id'] === itemId)
    return new Response(JSON.stringify(item, null, 2), { headers })
}

export const putValue = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const keyName = request.params.keyName
    const itemId = request.params.itemId
    const apiKey = request.headers.get('Authorization')
    const toPut = await request.json()
    const curr = await getData(apiKey, accountId, namespaceId, keyName)
    const indexToPut = curr.findIndex(item => item['id'] === itemId)
    if (indexToPut >= 0) {
        curr[indexToPut] = toPut
        curr[indexToPut]['id'] = itemId
    }
    const resp = await putData(apiKey, accountId, namespaceId, keyName, curr)
    return new Response(JSON.stringify(resp, null, 2), { headers })
}

export const deleteValue = async request => {
    const accountId = request.params.accountId
    const namespaceId = request.params.namespaceId
    const keyName = request.params.keyName
    const itemId = request.params.itemId
    const apiKey = request.headers.get('Authorization')
    const curr = await getData(apiKey, accountId, namespaceId, keyName)
    const indexToDelete = curr.findIndex(item => item['id'] === itemId)
    if (indexToDelete >= 0) {
        curr.splice(indexToDelete, 1)
    }
    console.log(curr)
    const resp = await putData(apiKey, accountId, namespaceId, keyName, curr)
    return new Response(JSON.stringify(resp, null, 2), { headers })
}
