/**
 * Store Information API – basic information about Printful stores.
 * @see https://developers.printful.com/docs/#tag/Store-Information-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

class StoreInformation extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get basic information about stores (depends on token access level).
   * GET /stores
   */
  public getAll(): Promise<Response> {
    return this._execute("/stores", { method: HttpMethod.Get });
  }

  /**
   * Get basic information about a store by ID.
   * GET /stores/{id}
   */
  public get(id: number): Promise<Response> {
    return this._execute(`/stores/${id}`, { method: HttpMethod.Get });
  }
}

export { StoreInformation };
