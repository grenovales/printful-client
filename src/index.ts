import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";
import { Shipping } from "./modules/Shipping";
import { Tax } from "./modules/Tax";
import { Orders } from "./modules/Orders";
import { Catalog } from "./modules/Catalog";

class PrintfulClient {
  public products: Products;
  public shipping: Shipping;
  public tax: Tax;
  public orders: Orders;
  public catalog: Catalog;

  /**
   *
   * @param apiToken Printful API Token
   * @param storeID Store ID, is not required unless using for one specific Store
   * @param apiVersion Optional API version path (e.g. "v2" or "/v2") to use in the base URL
   */
  constructor(apiToken: string, storeID?: string, apiVersion?: string) {
    if (!apiToken) throw new Error("No API Provided");
    const requestHelper = new RequestHelper(apiToken, storeID, apiVersion);
    this.products = new Products(requestHelper);
    this.shipping = new Shipping(requestHelper);
    this.tax = new Tax(requestHelper);
    this.orders = new Orders(requestHelper);
    this.catalog = new Catalog(requestHelper);
  }
}

export { PrintfulClient };
