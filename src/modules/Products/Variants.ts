/**
 * Printful Product Variant
 */
import { BaseModule } from "../BaseModule";
import { RequestHelper } from "../../RequestHelper";

class Variants extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get Product Variant by ID
   * @param id Variant ID, See Printful API Documentation
   * @returns Response Object with Variant Information
   */
  get(id: string): Promise<Response> {
    return this._execute(`/store/variants/${id}`, {
      method: "Get",
    });
  }
}

export { Variants };
