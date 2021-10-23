import { Router } from 'itty-router'
import { corsHelper } from './cors-helper'
import {
    getNamespaces,
    postNamespaces,
    putNamespaces,
    deleteNamespaces,
} from './api/namespaces'
import { getKeys, postNewKey } from './api/keys'
import {
    getValues,
    postNewValue,
    getValue,
    putValue,
    deleteValue,
} from './api/values'

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

router.get('/namespaces/:accountId', getNamespaces)
router.post('/namespaces/:accountId', postNamespaces)
router.put('/namespaces/:accountId/:namespaceId', putNamespaces)
router.delete('/namespaces/:accountId/:namespaceId', deleteNamespaces)

router.get('/namespaces/:accountId/:namespaceId/keys', getKeys)
router.post('/namespaces/:accountId/:namespaceId/keys', postNewKey)

router.get('/namespaces/:accountId/:namespaceId/:keyName', getValues)
router.post('/namespaces/:accountId/:namespaceId/:keyName', postNewValue)

router.get('/namespaces/:accountId/:namespaceId/:keyName/:itemId', getValue)
router.put('/namespaces/:accountId/:namespaceId/:keyName/:itemId', putValue)
router.delete(
    '/namespaces/:accountId/:namespaceId/:keyName/:itemId',
    deleteValue
)

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
