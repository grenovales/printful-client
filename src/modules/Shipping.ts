/**
 * Printfull Calculate Shipping Rate
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

/**
 * Shipping Request Type
 */
type ShippingRecipient = {
  address1?: string;
  address2?: string;
  city?: string;
  state_code?: string;
  country_code: string;
  zip?: string | number;
  phone?: string;
};

type ShippingItem = {
  variant_id?: string | number;
  external_variant_id?: string;
  warehouse_product_variant_id?: string | number;
  quantity: number;
  value?: string | number;
};

type ShippingRequest = {
  recipient: ShippingRecipient;
  items: ShippingItem[];
  currency?: string;
  locale?: string;
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
  public calculate(shippingRequest: ShippingRequest): Promise<Response> {
    //Get one Product
    return this._execute(`/shipping/rates`, {
      body: JSON.stringify(shippingRequest),
      method: HttpMethod.Post,
    });
  }
}

export { Shipping };
