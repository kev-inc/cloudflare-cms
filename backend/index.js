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

router.options('*', corsHelper)

router.get('/:accountId', getNamespaces)
router.post('/:accountId', postNamespaces)
router.put('/:accountId/:namespaceId', putNamespaces)
router.delete('/:accountId/:namespaceId', deleteNamespaces)

router.get('/:accountId/:namespaceId/keys', getKeys)
router.post('/:accountId/:namespaceId/keys', postNewKey)

router.get('/:accountId/:namespaceId/:keyName', getValues)
router.post('/:accountId/:namespaceId/:keyName', postNewValue)

router.get('/:accountId/:namespaceId/:keyName/:itemId', getValue)
router.put('/:accountId/:namespaceId/:keyName/:itemId', putValue)
router.delete('/:accountId/:namespaceId/:keyName/:itemId', deleteValue)

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
