import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";
import { Shipping } from "./modules/Shipping";
import { Tax } from "./modules/Tax";

class PrintfulClient {
  public products: Products;
  public shipping: Shipping;
  public tax: Tax;

  /**
   *
   * @param apiToken Printful API Token
   */
  constructor(apiToken: string) {
    if (!apiToken) throw new Error("No API Provided");
    const requestHelper = new RequestHelper(apiToken);
    this.products = new Products(requestHelper);
    this.shipping = new Shipping(requestHelper);
    this.tax = new Tax(requestHelper);
  }
}

export { PrintfulClient };
