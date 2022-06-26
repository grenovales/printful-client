import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";
import { Shipping } from "./modules/Shipping";
import { Tax } from "./modules/Tax";
import { Orders } from "./modules/Orders";

class PrintfulClient {
  public products: Products;
  public shipping: Shipping;
  public tax: Tax;
  public orders: Orders;
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
    this.orders = new Orders(requestHelper);
  }
}

export { PrintfulClient };
