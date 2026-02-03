/**
 * Printful Product
 */

import { BaseModule } from "../BaseModule";
import { Variants } from "./Variants";
import { RequestHelper, HttpMethod } from "../../RequestHelper";

type ProductQuery = {
  offset?: string;
  limit?: string;
  status?: string;
  category_id?: string | number | Array<string | number>;
};

type ItemOptionValue = string | number | boolean | Array<string | number | boolean>;

type ItemOption = {
  id: string;
  value: ItemOptionValue;
};

type FileOption = {
  id: string;
  value: ItemOptionValue;
};

type ProductFile = {
  id?: number;
  type?: string;
  url?: string;
  filename?: string;
  visible?: boolean;
  options?: FileOption[];
};

type SyncProductRequest = {
  external_id?: string;
  name?: string;
  thumbnail?: string;
};

type SyncVariantRequest = {
  id?: number;
  external_id?: string;
  retail_price?: string | number;
  variant_id?: number;
  files?: ProductFile[];
  options?: ItemOption[];
  is_ignored?: boolean;
  sku?: string | null;
  warehouse_product_variant_id?: number | null;
};

type SyncProductCreateRequest = {
  sync_product: SyncProductRequest & { name: string };
  sync_variants: Array<SyncVariantRequest & { variant_id: number; files: ProductFile[] }>;
};

type SyncProductUpdateRequest = {
  sync_product?: SyncProductRequest;
  sync_variants?: SyncVariantRequest[];
};

type SyncVariantCreateRequest = SyncVariantRequest & {
  variant_id: number;
  files: ProductFile[];
};

class Products extends BaseModule {
  public variants: Variants;

  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
    this.variants = new Variants(requestHelper);
  }

  public get(id: string | number): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/store/products/${pathId}`, {
      method: HttpMethod.Get,
    });
  }

  public getAll(productQuery?: ProductQuery): Promise<Response> {
    //Get all Products
    let path = `/store/products`;
    if (productQuery) {
      const params = new URLSearchParams();
      if (productQuery.offset) params.set("offset", productQuery.offset);
      if (productQuery.limit) params.set("limit", productQuery.limit);
      if (productQuery.status) params.set("status", productQuery.status);
      if (productQuery.category_id != null) {
        const categoryValue = Array.isArray(productQuery.category_id)
          ? productQuery.category_id.join(",")
          : productQuery.category_id.toString();
        params.set("category_id", categoryValue);
      }
      const queryString = params.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }
    return this._execute(path, {
      method: HttpMethod.Get,
    });
  }

  public create(payload: SyncProductCreateRequest): Promise<Response> {
    return this._execute("/store/products", {
      body: JSON.stringify(payload),
      method: HttpMethod.Post,
    });
  }

  public update(
    id: string | number,
    payload: SyncProductUpdateRequest
  ): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/store/products/${pathId}`, {
      body: JSON.stringify(payload),
      method: HttpMethod.Put,
    });
  }

  public delete(id: string | number): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/store/products/${pathId}`, {
      method: HttpMethod.Delete,
    });
  }

  public createVariant(
    id: string | number,
    payload: SyncVariantCreateRequest
  ): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/store/products/${pathId}/variants`, {
      body: JSON.stringify(payload),
      method: HttpMethod.Post,
    });
  }
}

export { Products };
