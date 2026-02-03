/**
 * Product Templates API – list, get, and delete product templates.
 * @see https://developers.printful.com/docs/#tag/Product-Templates-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

/** Query params for product template list (offset, limit). */
export type ProductTemplateListQuery = {
  offset?: string;
  limit?: string;
};

/**
 * Template ID: number (Printful template id) or string.
 * For external product id use a string prefixed with '@' (e.g. "@988123").
 */
export type ProductTemplateId = number | string;

class ProductTemplates extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get product template list.
   * GET /product-templates
   */
  public getAll(query?: ProductTemplateListQuery): Promise<Response> {
    let path = "/product-templates";
    if (query) {
      const params = new URLSearchParams();
      if (query.offset != null) params.set("offset", query.offset);
      if (query.limit != null) params.set("limit", query.limit);
      const qs = params.toString();
      if (qs) path += `?${qs}`;
    }
    return this._execute(path, { method: HttpMethod.Get });
  }

  /**
   * Get a single product template by id or external product id.
   * GET /product-templates/{id}
   * @param id Template id (number) or external product id (string with leading '@', e.g. "@988123")
   */
  public get(id: ProductTemplateId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/product-templates/${pathId}`, { method: HttpMethod.Get });
  }

  /**
   * Delete a product template by id or external product id.
   * DELETE /product-templates/{id}
   * @param id Template id (number) or external product id (string with leading '@', e.g. "@988123")
   */
  public delete(id: ProductTemplateId): Promise<Response> {
    const pathId =
      typeof id === "string" ? encodeURIComponent(id) : String(id);
    return this._execute(`/product-templates/${pathId}`, { method: HttpMethod.Delete });
  }
}

export { ProductTemplates };
