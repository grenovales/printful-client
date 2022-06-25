import { Printful } from "../src";

const print = new Printful("KEY HERE");

print.products.getAll().then((response: Response) => {
  response.json().then((val) => {
    console.log(val);
  });
});
