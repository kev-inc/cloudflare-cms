import { Router } from 'itty-router'
import { json } from 'itty-router-extras'
import { corsHelper } from './cors-helper'

const BASE_URL = 'https://api.cloudflare.com/client/v4/accounts/'

// Create a new router
const router = Router()

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
    return new Response(
        'Hello, world! This is the root page of your Worker template.'
    )
})

// Namespaces
router.get('/namespaces/:accountId', async request => {
    const accountId = request.params.accountId
    const apiKey = request.headers.get('Authorization')

    const resp = await fetch(BASE_URL + accountId + '/storage/kv/namespaces', {
        headers: {
            Authorization: apiKey,
        },
    }).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
})

/*
{
    "title": "My Namespace"
}
*/
router.post('/namespaces/:accountId', async request => {
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
})

/*
{
    "title": "My Namespace"
}
*/
router.put('/namespaces/:accountId/:namespaceId', async request => {
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
})

router.delete('/namespaces/:accountId/:namespaceId', async request => {
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
})

router.options('*', request => corsHelper())

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
