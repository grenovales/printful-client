# printful-client

Request wrapper for Printful, with authorization management. **Not to be used client-side**.

## Install


```bash
# Npm:
npm install printful-client

# Yarn:
yarn add printful-client

# Pnpm: 💝
pnpm add printful-client
```

### Get Product  

```js
const { PrintfulClient } = require("printful-client");
const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.products.get("PRODUCT_ID").then((response) => {
  response.json().then((value) => {
    console.log(JSON.stringify(value));
  });
});
```

### Get all store products 🛍 
```js
const { PrintfulClient } = require("printful-client");
const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.products.getAll().then((response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```
### Get product variant 👕  
```js
const { PrintfulClient } = require("printful-client");
const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.products.variants.get("VARIANT_ID").then((response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```

### Calculate Shipping Rate 📦 
```js
const shippingRequest = {
  recipient: {
    address1: "5246 US Hwy 98 N",
    city: "Lakeland",
    country_code: "US",
    state_code: "FL",
    zip: "33809"
  },
  items: [
    {
      variant_id: "11566",
      quantity: 10
    },
  ],
  currency: "USD",
  locale: "en_US",
};

printful.shipping.calculate(shippingRequest).then((response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```

### Get Tax Rate 😢 
```js
const taxRequest = {
  recipient: {
    "country_code": "US",
    "state_code": "FL",
    "city": "Lakeland",
    "zip": "33809"
  }
};

printful.tax.getRate(taxRequest).then((response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```

### Request JSON with error handling
`requestJson` parses the JSON body and throws a `PrintfulApiError` on non-2xx responses.

```js
const { PrintfulClient } = require("printful-client");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful
  .requestJson("/products")
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .catch((error) => {
    console.error(error.status, error.message);
  });
```
Refer to the [Printful API Documentation](https://developers.printful.com/docs/)

## Links

- [License (MIT)](LICENSE)

## Contributions

**New contributors welcome!** just create a PR 😎

## Suggested Improvements
- Add an optional `fetch`/base URL override for easier testing and custom environments.
- Support request timeouts/abort signals and optional retry/backoff (honor `Retry-After`).
- Improve error parsing by reading the body once and surfacing request IDs when available.
- Provide typed response helpers (or a `requestJson` convenience on modules) to reduce `response.json()` boilerplate.
- Normalize pagination/query parameter types to numbers with validation.
- Add unit/integration tests and basic CI.

## Todo
- Re-organize types 
- Add more endpoints
- Unit testing
