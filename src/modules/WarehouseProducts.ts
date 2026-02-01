/**
 * Warehouse Products API – list and get warehouse product data.
 * @see https://developers.printful.com/docs/#tag/Warehouse-Products-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

/** Query params for warehouse product list. */
export type WarehouseProductListQuery = {
  /** Product search needle. */
  search?: string;
  offset?: string | number;
  limit?: string | number;
};

/** Options for getAll (e.g. force paginated response). */
export type WarehouseProductListOptions = {
  /** When true, send X-PF-Force-Pagination header to get paginated results. */
  forcePagination?: boolean;
};

/**
 * Warehouse product id: number or string.
 */
export type WarehouseProductId = number | string;

class WarehouseProducts extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get a list of warehouse products from your store.
   * GET /warehouse/products
   * To get paginated results, pass options.forcePagination: true (sends X-PF-Force-Pagination header).
   */
  public getAll(
    query?: WarehouseProductListQuery,
    options?: WarehouseProductListOptions
  ): Promise<Response> {
    let path = "/warehouse/products";
    if (query) {
      const params = new URLSearchParams();
      if (query.search != null) params.set("search", String(query.search));
      if (query.offset != null) params.set("offset", String(query.offset));
      if (query.limit != null) params.set("limit", String(query.limit));
      const qs = params.toString();
      if (qs) path += `?${qs}`;
    }
    const requestInit: RequestInit = { method: "Get" };
    if (options?.forcePagination) {
      requestInit.headers = new Headers({ "X-PF-Force-Pagination": "1" });
    }
    return this._execute(path, requestInit);
  }

  /**
   * Get warehouse product data by ID.
   * GET /warehouse/products/{id}
   */
  public get(id: WarehouseProductId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/warehouse/products/${pathId}`, { method: "Get" });
  }
}

export { WarehouseProducts };
