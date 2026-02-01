/**
 * Ecommerce Platform Sync API – Sync Products (list, get, delete).
 * @see https://developers.printful.com/docs/#tag/Ecommerce-Platform-Sync-API
 */

import { BaseModule } from "../BaseModule";
import { RequestHelper } from "../../RequestHelper";

/** Sync product list status filter. */
export type SyncProductStatus =
  | "all"
  | "synced"
  | "unsynced"
  | "ignored"
  | "imported"
  | "discontinued"
  | "out_of_stock";

/** Query params for sync product list. */
export type SyncProductListQuery = {
  search?: string;
  offset?: string | number;
  limit?: string | number;
  status?: SyncProductStatus;
};

/**
 * Sync product id: number (Printful sync product id) or string (external id with leading '@').
 */
export type SyncProductId = number | string;

class SyncProducts extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get list of Sync Products from your store.
   * GET /sync/products
   */
  public getAll(query?: SyncProductListQuery): Promise<Response> {
    let path = "/sync/products";
    if (query) {
      const params = new URLSearchParams();
      if (query.search != null) params.set("search", String(query.search));
      if (query.offset != null) params.set("offset", String(query.offset));
      if (query.limit != null) params.set("limit", String(query.limit));
      if (query.status != null) params.set("status", query.status);
      const qs = params.toString();
      if (qs) path += `?${qs}`;
    }
    return this._execute(path, { method: "Get" });
  }

  /**
   * Get a single Sync Product and its Sync Variants.
   * GET /sync/products/{id}
   * @param id Sync product id (number) or external id (string with leading '@', e.g. "@4235234213")
   */
  public get(id: SyncProductId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/sync/products/${pathId}`, { method: "Get" });
  }

  /**
   * Delete a Sync Product and all its Sync Variants.
   * DELETE /sync/products/{id}
   * @param id Sync product id (number) or external id (string with leading '@')
   */
  public delete(id: SyncProductId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/sync/products/${pathId}`, { method: "Delete" });
  }
}

export { SyncProducts };
