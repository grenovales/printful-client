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

printful.products.get("PRODUCT_ID").then((response: Response) => {
  response.json().then((value) => {
    console.log(JSON.stringify(val));
  });
});
```

### Get all store products 🛍 
```js
const { PrintfulClient } = require("printful-client");
const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

//TODO: Add PageSize
printful.products.getAll().then((response: Response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```
### Get product variant 👕  
```js
const { PrintfulClient } = require("printful-client");
const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.products.variants.get("VARIANT_ID").then((response: Response) => {
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

printful.shipping.calculate(shippingRquest).then((response: Response) => {
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

printful.tax.getRate(taxRequest).then((response: Response) => {
  response.json().then((val) => {
    console.log(JSON.stringify(val));
  });
});
```
Refer to the [Printful API Documentation](https://developers.printful.com/docs/)

## Links

- [License (MIT)](LICENSE)

## Contributions

**New contributors welcome!** just create a PR 😎

## Todo
- Add PgaeSize to GetAll Products
- Add more endpoints
- Unit testing