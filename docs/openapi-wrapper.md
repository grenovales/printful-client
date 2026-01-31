# Printful OpenAPI v1 Wrapper Notes

This document explains how the current client wraps the Printful API and how it maps
to the v1 OpenAPI spec in `docs/printful-openapi.v1.json`.

## Spec Source

- v1 spec file: `docs/printful-openapi.v1.json`
- v2 is planned separately; keep this doc aligned with v1 endpoints only.

## Wrapper Architecture

- Entry point: `src/index.ts` exposes `PrintfulClient` and instantiates modules.
- HTTP layer: `src/RequestHelper.ts` builds the base URL, sets auth headers, and
  sends requests with `fetch`.
- Shared module base: `src/modules/BaseModule.ts` exposes `_execute()` for requests.
- Module layout:
  - Store modules: `src/modules/Products/*`
  - Catalog modules: `src/modules/Catalog/*`
  - Other modules: `src/modules/Orders.ts`, `src/modules/Shipping.ts`,
    `src/modules/Tax.ts`

### Request Behavior

- Base URL: `https://api.printful.com` (optional `apiVersion` path in constructor).
- Auth: `Authorization: Bearer <token>`.
- Store scope header (optional): `X-PF-Store-Id`.
- Localisation header (optional): `X-PF-Language`.

### Error Handling Helper (opt-in)

The client exposes `requestJson()` to parse JSON and throw a `PrintfulApiError`
for non-2xx responses. This is opt-in and does not change existing module
methods that return `Response`.

Example:

```ts
const data = await client.requestJson<{ code: number; result: unknown }>(
  "/products"
);
```

## OpenAPI Tag to Module Mapping

This maps OpenAPI tags in the v1 spec to the current module locations.

| OpenAPI Tag | Module(s) |
| --- | --- |
| Catalog API | `src/modules/Catalog/Products.ts`, `src/modules/Catalog/Categories.ts`, `src/modules/Catalog/Variants.ts` |
| Products API | `src/modules/Products/index.ts`, `src/modules/Products/Variants.ts` |
| Orders API | `src/modules/Orders.ts` |
| Shipping Rate API | `src/modules/Shipping.ts` |
| Tax Rate API | `src/modules/Tax.ts` |
| Product Templates API | Not implemented (v1 spec only) |
| File Library API | Not implemented (v1 spec only) |
| Webhook API | Not implemented (v1 spec only) |
| Store Information API | Not implemented (v1 spec only) |
| Mockup Generator API | Not implemented (v1 spec only) |
| OAuth API | Not implemented (v1 spec only) |
| Warehouse Products API | Not implemented (v1 spec only) |
| Reports API | Not implemented (v1 spec only) |
| Approval Sheets API | Not implemented (v1 spec only) |
| Country/State Code API | Not implemented (v1 spec only) |

## Endpoint to Method Mapping (v1)

This list captures the currently implemented endpoints and their wrapper methods.

### Catalog API
- `GET /products` -> `client.catalog.products.getAll(query?)`
- `GET /products/{id}` -> `client.catalog.products.get(id)`
- `GET /products/{id}/sizes` -> `client.catalog.products.getSizes(id, unit?)`
- `GET /products/variant/{id}` -> `client.catalog.products.variants.get(id)`
- `GET /categories` -> `client.catalog.categories.getAll()`
- `GET /categories/{id}` -> `client.catalog.categories.get(id)`

### Products API (Store)
- `GET /store/products` -> `client.products.getAll(query?)`
- `POST /store/products` -> `client.products.create(body)`
- `GET /store/products/{id}` -> `client.products.get(id)`
- `PUT /store/products/{id}` -> `client.products.update(id, body)`
- `DELETE /store/products/{id}` -> `client.products.delete(id)`
- `POST /store/products/{id}/variants` -> `client.products.createVariant(id, body)`
- `GET /store/variants/{id}` -> `client.products.variants.get(id)`
- `PUT /store/variants/{id}` -> `client.products.variants.update(id, body)`
- `DELETE /store/variants/{id}` -> `client.products.variants.delete(id)`

### Orders API
- `POST /orders/estimate-costs` -> `client.orders.estimate_cost(body)`
- `POST /orders` -> `client.orders.create(body)`
- `GET /orders/{id}` -> `client.orders.get(id)`
- `GET /orders` -> `client.orders.getAll(query?)`
- `POST /orders/{id}/confirm` -> `client.orders.confirm(id)`
- `DELETE /orders/{id}` -> `client.orders.cancel(id)`

### Shipping Rate API
- `POST /shipping/rates` -> `client.shipping.calculate(body)`

### Tax Rate API
- `POST /tax/rates` -> `client.tax.getRate(body)`

## Query Params Reference (v1)

### Catalog API
- `client.catalog.products.getAll({ category_id, offset, limit })`
- `client.catalog.products.getSizes(id, unit?)` where `unit` is `inches` or `cm`

### Products API (Store)
- `client.products.getAll({ status, category_id, offset, limit })`

## Adding or Updating Endpoints (v1)

When extending the wrapper with new v1 endpoints:

1. Choose the correct module based on the OpenAPI tag.
2. Add a new method in the module and call `_execute(path, options)`.
3. Keep request semantics consistent with `RequestHelper`:
   - Use `Authorization: Bearer <token>`.
   - Apply `X-PF-Store-Id` if the caller provided it.
4. Add or refine request/response types local to the module (match v1 schema).
5. Update this document:
   - Add the endpoint under the matching section.
   - Update the tag mapping if a new module is created.

## Notes for v2

If a v2 OpenAPI spec is introduced, do not replace the v1 file. Add a separate
`docs/printful-openapi.v2.json` and a new mapping doc, keeping this file scoped
to v1.
