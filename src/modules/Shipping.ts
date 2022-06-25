/**
 * Printfull Calculate Shipping Rate
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

/**
 * Shipping Request Type
 */
type ShippingRequest = {
  recipient: {
    address1: string;
    city: string;
    country_code: string;
    state_code?: string;
    zip?: string | number;
    phone?: string;
  };
  items: {
    variant_id?: string;
    external_variant_id?: string;
    warehouse_product_variant_id?: string;
    quantity: number;
    value?: string;
  }[];
  currency: string;
  locale: string;
};

class Shipping extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Calculate shipping rate for the order
   * @param shippingRequest
   * @returns Response Object with Shipping Rate
   */
  calculate(shippingRequest: ShippingRequest): Promise<Response> {
    //Get one Product
    return this._execute(`/shipping/rates`, {
      body: JSON.stringify(shippingRequest),
      method: "Post",
    });
  }
}

export { Shipping };
