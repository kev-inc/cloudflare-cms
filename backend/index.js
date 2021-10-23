import { Router } from 'itty-router'
import { json } from 'itty-router-extras'

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
    const apiKey = request.query.apiKey

    const resp = await fetch(BASE_URL + accountId + '/storage/kv/namespaces', {
        headers: {
            Authorization: apiKey,
        },
    }).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
})

/*
{
    "data": {
        "title": "My Namespace"
    },
    "apiKey": "Bearer 5OWK63MRVbZXRNufHeaXVSav0QWCAxs45dbCtDyy"
}
*/
router.post('/namespaces/:accountId', async request => {
    const accountId = request.params.accountId
    const { data, apiKey } = await request.json()

    const resp = await fetch(BASE_URL + accountId + '/storage/kv/namespaces', {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2))
})

/*
This shows a different HTTP method, a POST.

Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
router.post('/post', async request => {
    // Create a base object with some fields.
    let fields = {
        asn: request.cf.asn,
        colo: request.cf.colo,
    }

    // If the POST data is JSON then attach it to our response.
    if (request.headers.get('Content-Type') === 'application/json') {
        fields['json'] = await request.json()
    }

    // Serialise the JSON to a string.
    const returnData = JSON.stringify(fields, null, 2)

    return new Response(returnData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
})

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
