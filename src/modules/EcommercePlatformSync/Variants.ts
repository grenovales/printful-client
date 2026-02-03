/**
 * Ecommerce Platform Sync API – Sync Variants (get, update, delete).
 * @see https://developers.printful.com/docs/#tag/Ecommerce-Platform-Sync-API
 */

import { BaseModule } from "../BaseModule";
import { RequestHelper, HttpMethod } from "../../RequestHelper";

/** File attachment for sync variant (partial File schema). */
export type SyncVariantFile = {
  url: string;
  options?: Array<{ id: string; value: string }>;
  filename?: string;
  visible?: boolean;
};

/** Option for sync variant (e.g. embroidery_type). */
export type SyncVariantOption = {
  id: string;
  value: string;
};

/** Request body for updating a Sync Variant (PUT /sync/variant/{id}). Only include fields to change. */
export type SyncVariantUpdateRequest = {
  /** Printful Variant ID this Sync Variant is synced to. */
  variant_id?: number;
  /** Retail price for this item. */
  retail_price?: string;
  /** SKU of this Sync Variant (nullable). */
  sku?: string | null;
  /** If true, variant is ignored by Printful for order imports and stock. */
  is_ignored?: boolean;
  /** Attached printfiles/preview images. */
  files?: SyncVariantFile[];
  /** Additional options for the product/variant. */
  options?: SyncVariantOption[];
};

/**
 * Sync variant id: number (Printful sync variant id) or string (external id with leading '@').
 */
export type SyncVariantId = number | string;

class SyncVariants extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get a single Sync Variant.
   * GET /sync/variant/{id}
   * @param id Sync variant id (number) or external id (string with leading '@', e.g. "@12312414")
   */
  public get(id: SyncVariantId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/sync/variant/${pathId}`, { method: HttpMethod.Get });
  }

  /**
   * Modify an existing Sync Variant. Only send fields that need to change.
   * PUT /sync/variant/{id}
   * Rate limit: up to 10 requests per 60 seconds.
   */
  public update(
    id: SyncVariantId,
    body: SyncVariantUpdateRequest
  ): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/sync/variant/${pathId}`, {
      body: JSON.stringify(body),
      method: HttpMethod.Put,
    });
  }

  /**
   * Delete configuration for a Sync Variant (variant_id, files, options) and disable automatic order importing.
   * DELETE /sync/variant/{id}
   */
  public delete(id: SyncVariantId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/sync/variant/${pathId}`, { method: HttpMethod.Delete });
  }
}

export { SyncVariants };
