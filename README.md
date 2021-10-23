# Cloudflare CMS

Link to Frontend: https://cloudflare-cms.pages.dev/

Link to Backend: https://cloudflare-cms-api.kevc.workers.dev/

Cloudflare CMS is a content management system that utilises Cloudflare Products (Workers, KV, and Pages) to provide a familiar environment to use Cloudflare Products. This Swagger UI page allows you to access your Cloudflare KV and use it like any other database. 'Values' are like tables, 'Keys' are like databases with a collection of tables, and 'Namespaces' are like a collection of databases. This Swagger page can be used to access Cloudflare KV belonging to any person, as long as you have the API token with KV permissions.

Important Notes:

* Authorize with your API token (Enter `Bearer <YOUR_API_KEY>` in the Authorize prompt)
* `accountId` can be found on the right side of your account's workers overview page
* `namespaceId` can be found in your account's worker KV page
* `keyName` is the name of the key in your namespace
* `itemId` is the ID of an object in the array of values of the key
