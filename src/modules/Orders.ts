/**
 * Printfull Calculate Shipping Rate
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

/**
 * Order Request Type
 */
type OrderRequest = {
  external_id?: string;
  shipping?: string;
  recipient: {
    name?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state_code?: string;
    state_name?: string;
    country_code?: string;
    country_name?: string;
    zip?: string;
    phone?: string;
    email?: string;
    tax_number?: string;
  };
  items: {
    id?: number;
    external_id?: string;
    variant_id?: number;
    sync_variant_id?: number;
    warehouse_product_variant_id?: number;
    quantity: number;
    price?: string; // Prinful Price of the item
    retail_price: string; // Original retail price of the item to be displayed on the packing slip
    name?: string;
    product?: {
      variant_id: number;
      product_id: number;
      image: string;
      name: string;
    };
    files?: {
      type?: string;
      url: string;
      options: {
        id: string;
        value: string;
      }[];
      filename: string;
      visible: boolean;
      position: {
        area_width: number;
        area_height: number;
        width: number;
        height: number;
        top: number;
        left: number;
        limit_to_print_area: boolean;
      };
    }[];
    options?: {
      id: string;
      value: string;
    }[];
    sku?: string;
  }[];
  retail_cost?: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    digitization: string;
    tax: string;
    vat: string;
    total: string;
  };
  gift?: {
    subject: string;
    message: string;
  };
  packing_slip?: {
    email: string;
    phone: string;
    message: string;
    logo_url: string;
    store_name: string;
    custome_order_id: string;
  };
};

type OrderQuery = {
  status?: string;
  offset?: string;
  limit?: string;
};

class Orders extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Estimate Order Cost
   * @param shippingRequest
   * @returns Response Object with Order Cost
   */
  estimate_cost(orderRequest: OrderRequest): Promise<Response> {
    //Get one Product
    return this._execute(`/orders/estimate-costs`, {
      body: JSON.stringify(orderRequest),
      method: "Post",
    });
  }

  /**
   * Create an Order in Printful
   * @param orderRequest Order request object
   * @returns
   */
  create(orderRequest: OrderRequest): Promise<Response> {
    //Get one Product
    return this._execute(`/orders`, {
      body: JSON.stringify(orderRequest),
      method: "Post",
    });
  }

  /**
   * Get order by ID
   * @param orderID Order ID
   * @returns
   */
  get(orderID: string | number): Promise<Response> {
    //Get one Product
    return this._execute(`/orders/${orderID}`, {
      method: "Get",
    });
  }

  /**
   * Get all Orders
   * @param orderQuery Query Params
   * @returns
   */
  getAll(orderQuery?: OrderQuery): Promise<Response> {
    //Get one Product
    let path = "/orders";
    if (orderQuery) {
      path += `?${new URLSearchParams(orderQuery).toString()}`;
    }

    return this._execute(path.toString(), {
      method: "Get",
    });
  }

  /**
   * Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment
   * @param orderID Order ID
   * @returns
   */
  confirm(orderID: string | number): Promise<Response> {
    //Get one Product
    return this._execute(`/orders/${orderID}/confirm`, {
      method: "Post",
    });
  }

  /**
   * Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
   * @param orderID Otrder ID
   * @returns
   */
  cancel(orderID: string | number): Promise<Response> {
    //Get one Product
    return this._execute(`/orders/${orderID}`, {
      method: "Delete",
    });
  }
}

export { Orders };
