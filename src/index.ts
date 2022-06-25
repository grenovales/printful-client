import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";

class Printful {
  public products: Products;

  constructor(apiToken: string) {
    if (!apiToken) throw new Error("No API Provided");
    const requestHelper = new RequestHelper(apiToken);
    this.products = new Products(requestHelper);
  }
}

export { Printful };
