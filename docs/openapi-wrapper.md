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
| Product Templates API | `src/modules/ProductTemplates.ts` |
| File Library API | `src/modules/FileLibrary.ts` |
| Ecommerce Platform Sync API | `src/modules/EcommercePlatformSync/Products.ts`, `src/modules/EcommercePlatformSync/Variants.ts`, `src/modules/EcommercePlatformSync/index.ts` |
| Webhook API | Not implemented (v1 spec only) |
| Store Information API | `src/modules/StoreInformation.ts` |
| Mockup Generator API | `src/modules/MockupGenerator.ts` |
| OAuth API | Not implemented (v1 spec only) |
| Warehouse Products API | `src/modules/WarehouseProducts.ts` |
| Reports API | `src/modules/Reports.ts` |
| Approval Sheets API | `src/modules/ApprovalSheets.ts` |
| Country/State Code API | `src/modules/CountryStateCode.ts` |

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

### Product Templates API
- `GET /product-templates` -> `client.productTemplates.getAll(query?)`
- `GET /product-templates/{id}` -> `client.productTemplates.get(id)`
- `DELETE /product-templates/{id}` -> `client.productTemplates.delete(id)`

### File Library API
- `POST /files` -> `client.fileLibrary.add(body)`
- `GET /files/{id}` -> `client.fileLibrary.get(id)`
- `POST /files/thread-colors` -> `client.fileLibrary.getThreadColors(body)`

### Ecommerce Platform Sync API
- `GET /sync/products` -> `client.ecommercePlatformSync.products.getAll(query?)`
- `GET /sync/products/{id}` -> `client.ecommercePlatformSync.products.get(id)`
- `DELETE /sync/products/{id}` -> `client.ecommercePlatformSync.products.delete(id)`
- `GET /sync/variant/{id}` -> `client.ecommercePlatformSync.variants.get(id)`
- `PUT /sync/variant/{id}` -> `client.ecommercePlatformSync.variants.update(id, body)`
- `DELETE /sync/variant/{id}` -> `client.ecommercePlatformSync.variants.delete(id)`

### Country/State Code API
- `GET /countries` -> `client.countryStateCode.getCountries()`

### Store Information API
- `GET /stores` -> `client.storeInformation.getAll()`
- `GET /stores/{id}` -> `client.storeInformation.get(id)`

### Mockup Generator API
- `POST /mockup-generator/create-task/{id}` -> `client.mockupGenerator.createTask(productId, body)`
- `GET /mockup-generator/printfiles/{id}` -> `client.mockupGenerator.getPrintfiles(productId, query?)`
- `GET /mockup-generator/task` -> `client.mockupGenerator.getTask(taskKey)`

### Warehouse Products API
- `GET /warehouse/products` -> `client.warehouseProducts.getAll(query?, options?)`
- `GET /warehouse/products/{id}` -> `client.warehouseProducts.get(id)`

### Reports API
- `GET /reports/statistics` -> `client.reports.getStatistics(query)`

### Approval Sheets API
- `GET /approval-sheets` -> `client.approvalSheets.getAll()`
- `POST /approval-sheets` -> `client.approvalSheets.approveDesign(confirmHash, body)`
- `POST /approval-sheets/changes` -> `client.approvalSheets.submitChanges(confirmHash, body)`

### Tax Rate API
- `GET /tax/countries` -> `client.tax.getCountries()`
- **Omitted (deprecated):** `POST /tax/rates` On July 29, 2025, we started the sunset process. The rate limit is being reduced by 10 RPM each week (starting with 60) until it reaches 0 on September 8, 2025, at which point the endpoint will be removed entirely. [Tax Rate API – Calculate tax rate](https://developers.printful.com/docs/#tag/Tax-Rate-API/operation/calculateTaxRates).

## Query Params Reference (v1)

### Catalog API
- `client.catalog.products.getAll({ category_id, offset, limit })`
- `client.catalog.products.getSizes(id, unit?)` where `unit` is `inches` or `cm`

### Products API (Store)
- `client.products.getAll({ status, category_id, offset, limit })`

### Product Templates API
- `client.productTemplates.getAll({ offset, limit })`
- `client.productTemplates.get(id)` / `client.productTemplates.delete(id)` — `id` is template id (number) or external product id (string with leading `@`, e.g. `"@988123"`)

### File Library API
- `client.fileLibrary.add({ url, options?, filename?, visible? })`
- `client.fileLibrary.get(id)` — `id` is file id (number)
- `client.fileLibrary.getThreadColors({ file_url })`

### Country/State Code API
- `client.countryStateCode.getCountries()` — countries and states accepted for orders (ISO 3166-1 alpha-2 / ISO 3166-2)

### Store Information API
- `client.storeInformation.getAll()` — list stores (depends on token)
- `client.storeInformation.get(id)` — single store by ID (number)

### Mockup Generator API
- `client.mockupGenerator.createTask(productId, body)` — create async mockup task; body: `variant_ids`, `format` (jpg \| png), `files?`, `product_template_id?`, etc.
- `client.mockupGenerator.getPrintfiles(productId, { orientation?, technique? })` — printfiles for product (orientation: `horizontal` \| `vertical`)
- `client.mockupGenerator.getTask(taskKey)` — poll task result by task_key from createTask

### Warehouse Products API
- `client.warehouseProducts.getAll(query?, options?)` — query: `search?`, `offset?`, `limit?`; options: `forcePagination?` (sends `X-PF-Force-Pagination: 1` for paginated response)
- `client.warehouseProducts.get(id)` — warehouse product by id (number or string)

### Reports API
- `client.reports.getStatistics({ report_types, date_from, date_to, currency? })` — report_types: comma-separated string or array; date_from/date_to: Y-m-d; period max 6 months

### Approval Sheets API
- `client.approvalSheets.getAll()` — list approval sheets (on-hold orders with suggested changes)
- `client.approvalSheets.approveDesign(confirmHash, { status: "approved" })` — approve design and remove hold
- `client.approvalSheets.submitChanges(confirmHash, { message, files })` — submit alternative design changes (files: array of `{ url }`)

### Ecommerce Platform Sync API
- `client.ecommercePlatformSync.products.getAll({ search?, offset?, limit?, status? })` — `status`: `all` \| `synced` \| `unsynced` \| `ignored` \| `imported` \| `discontinued` \| `out_of_stock`
- `client.ecommercePlatformSync.products.get(id)` / `client.ecommercePlatformSync.products.delete(id)` — `id` is sync product id (number) or external id (string with leading `@`)
- `client.ecommercePlatformSync.variants.get(id)` / `client.ecommercePlatformSync.variants.update(id, body)` / `client.ecommercePlatformSync.variants.delete(id)` — `id` is sync variant id (number) or external id (string with leading `@`)

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

## Deprecated / Omitted Endpoints (v1)

Endpoints that exist in the Printful v1 API but are **not** implemented in this wrapper because they are deprecated or sunset:

| Endpoint | Reason | Reference |
| --- | --- | --- |
| `POST /tax/rates` (Calculate tax rate) | Deprecated by Printful; sunset process started July 2025; no replacement in the Printful API. Use order creation/estimation for costs including tax, or external tax providers. | [Tax Rate API – Calculate tax rate](https://developers.printful.com/docs/#tag/Tax-Rate-API/operation/calculateTaxRates) |

## Notes for v2

If a v2 OpenAPI spec is introduced, do not replace the v1 file. Add a separate
`docs/printful-openapi.v2.json` and a new mapping doc, keeping this file scoped
to v1.
