import { RequestHelper } from "./RequestHelper";
import { Products } from "./modules/Products";
import { Shipping } from "./modules/Shipping";
import { Tax } from "./modules/Tax";
import { Orders } from "./modules/Orders";
import { Catalog } from "./modules/Catalog";
import { ProductTemplates } from "./modules/ProductTemplates";
import { FileLibrary } from "./modules/FileLibrary";
import { EcommercePlatformSync } from "./modules/EcommercePlatformSync";
import { CountryStateCode } from "./modules/CountryStateCode";
import { StoreInformation } from "./modules/StoreInformation";
import { MockupGenerator } from "./modules/MockupGenerator";
import { WarehouseProducts } from "./modules/WarehouseProducts";
import { Reports } from "./modules/Reports";
import { ApprovalSheets } from "./modules/ApprovalSheets";

class PrintfulClient {
  private requestHelper: RequestHelper;
  public products: Products;
  public shipping: Shipping;
  public tax: Tax;
  public orders: Orders;
  public catalog: Catalog;
  public productTemplates: ProductTemplates;
  public fileLibrary: FileLibrary;
  public ecommercePlatformSync: EcommercePlatformSync;
  public countryStateCode: CountryStateCode;
  public storeInformation: StoreInformation;
  public mockupGenerator: MockupGenerator;
  public warehouseProducts: WarehouseProducts;
  public reports: Reports;
  public approvalSheets: ApprovalSheets;

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
    this.productTemplates = new ProductTemplates(this.requestHelper);
    this.fileLibrary = new FileLibrary(this.requestHelper);
    this.ecommercePlatformSync = new EcommercePlatformSync(this.requestHelper);
    this.countryStateCode = new CountryStateCode(this.requestHelper);
    this.storeInformation = new StoreInformation(this.requestHelper);
    this.mockupGenerator = new MockupGenerator(this.requestHelper);
    this.warehouseProducts = new WarehouseProducts(this.requestHelper);
    this.reports = new Reports(this.requestHelper);
    this.approvalSheets = new ApprovalSheets(this.requestHelper);
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
export { HttpMethod } from "./RequestHelper";
