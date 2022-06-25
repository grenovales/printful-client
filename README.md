# printful-client

Request wrapper for Printful, with authorization management. **Not to be used client-side**.

## Quickstart

```js
const { PrintfulClient } = require("printful-client");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.products.get("PRODUCT_ID").then((response: Response) => {
  response.json().then((value) => {
    console.log(JSON.stringify(val));
  });
});

// Or with a simple request

## Examples

Refer to the [Printful API Documentation](https://www.printful.com/docs) for possible URLs. This library acts as a small layer for parsing JSON, and passing API keys as authorization headers.
