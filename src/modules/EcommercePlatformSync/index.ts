/**
 * Ecommerce Platform Sync API – sync products and variants with your store.
 * @see https://developers.printful.com/docs/#tag/Ecommerce-Platform-Sync-API
 */

import { BaseModule } from "../BaseModule";
import { RequestHelper } from "../../RequestHelper";
import { SyncProducts } from "./Products";
import { SyncVariants } from "./Variants";

class EcommercePlatformSync extends BaseModule {
  public products: SyncProducts;
  public variants: SyncVariants;

  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
    this.products = new SyncProducts(requestHelper);
    this.variants = new SyncVariants(requestHelper);
  }
}

export { EcommercePlatformSync };
export type {
  SyncProductListQuery,
  SyncProductStatus,
  SyncProductId,
} from "./Products";
export type {
  SyncVariantFile,
  SyncVariantOption,
  SyncVariantUpdateRequest,
  SyncVariantId,
} from "./Variants";
