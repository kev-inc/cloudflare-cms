import { Router } from 'itty-router'
import { corsHelper } from './cors-helper'
import {
    getNamespaces,
    postNamespaces,
    putNamespaces,
    deleteNamespaces,
} from './api/namespaces'
import { getKeys } from './api/keys'

const BASE_URL = 'https://api.cloudflare.com/client/v4/accounts/'

const router = Router()

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
    return new Response(
        'Hello, world! This is the root page of your Worker template.'
    )
})

// Namespaces
router.options('*', corsHelper)

router
    .get('/namespaces/:accountId', getNamespaces)
    .post('/namespaces/:accountId', postNamespaces)
    .put('/namespaces/:accountId/:namespaceId', putNamespaces)
    .delete('/namespaces/:accountId/:namespaceId', deleteNamespaces)
    .get('/namespaces/:accountId/:namespaceId/keys', getKeys)

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
