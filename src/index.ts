import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";
import { Shipping } from "./modules/Shipping";
import { Tax } from "./modules/Tax";
import { Orders } from "./modules/Orders";
import { Catalog } from "./modules/Catalog";

class PrintfulClient {
  private requestHelper: RequestHelper;
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
   * @param locale Optional localisation locale (e.g. "es_ES") for X-PF-Language
   */
  constructor(
    apiToken: string,
    storeID?: string,
    apiVersion?: string,
    locale?: string
  ) {
    if (!apiToken) throw new Error("No API Provided");
    const requestHelper = new RequestHelper(
      apiToken,
      storeID,
      apiVersion,
      locale
    );
    this.requestHelper = requestHelper;
    this.products = new Products(this.requestHelper);
    this.shipping = new Shipping(this.requestHelper);
    this.tax = new Tax(this.requestHelper);
    this.orders = new Orders(this.requestHelper);
    this.catalog = new Catalog(this.requestHelper);
  }

  public requestJson<T>(
    path: string,
    options?: RequestInit | undefined
  ): Promise<T> {
    return this.requestHelper.requestJson<T>(path, options);
  }
}

export { PrintfulClient };
export type { PrintfulApiError } from "./RequestHelper";
