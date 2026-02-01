/**
 * Printfull Calculate Shipping Rate
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

/**
 * Order Request Type
 */
type ItemOptionValue = string | number | boolean | Array<string | number | boolean>;

type ItemOption = {
  id: string;
  value: ItemOptionValue;
};

type FileOption = {
  id: string;
  value: ItemOptionValue;
};

type FilePosition = {
  area_width?: number;
  area_height?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  limit_to_print_area?: boolean;
};

type OrderFile = {
  id?: number;
  type?: string;
  url?: string;
  filename?: string;
  visible?: boolean;
  options?: FileOption[];
  position?: FilePosition;
};

type OrderRecipient = {
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

type OrderItem = {
  id?: number;
  external_id?: string;
  variant_id?: number;
  sync_variant_id?: number;
  external_variant_id?: string;
  warehouse_product_variant_id?: number;
  product_template_id?: number;
  external_product_id?: string;
  quantity: number;
  price?: string;
  retail_price?: string;
  name?: string;
  product?: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files?: OrderFile[];
  options?: ItemOption[];
  sku?: string | null;
  discontinued?: boolean;
  out_of_stock?: boolean;
};

type RetailCosts = {
  currency?: string;
  subtotal?: string | number | null;
  discount?: string | number | null;
  shipping?: string | number | null;
  tax?: string | number | null;
  vat?: string | number | null;
  total?: string | number | null;
};

type OrderGift = {
  subject?: string;
  message?: string;
};

type PackingSlip = {
  email?: string;
  phone?: string;
  message?: string;
  logo_url?: string;
  store_name?: string;
  custom_order_id?: string;
};

type OrderRequest = {
  external_id?: string;
  shipping?: string;
  recipient: OrderRecipient;
  items: OrderItem[];
  retail_costs?: RetailCosts;
  gift?: OrderGift;
  packing_slip?: PackingSlip;
};

type OrderQuery = {
  status?: string;
  offset?: string;
  limit?: string;
};

type CreateOrderOptions = {
  confirm?: boolean;
  update_existing?: boolean;
};

type UpdateOrderOptions = {
  confirm?: boolean;
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
  public estimate_cost(orderRequest: OrderRequest): Promise<Response> {
    //Get one Product
    return this._execute(`/orders/estimate-costs`, {
      body: JSON.stringify(orderRequest),
      method: HttpMethod.Post,
    });
  }

  /**
   * Create an Order in Printful
   * @param orderRequest Order request object
   * @returns
   */
  public create(
    orderRequest: OrderRequest,
    options?: CreateOrderOptions
  ): Promise<Response> {
    //Get one Product
    let path = `/orders`;
    if (options) {
      const params = new URLSearchParams();
      if (options.confirm !== undefined) {
        params.set("confirm", options.confirm ? "true" : "false");
      }
      if (options.update_existing !== undefined) {
        params.set("update_existing", options.update_existing ? "true" : "false");
      }
      const queryString = params.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }
    return this._execute(path, {
      body: JSON.stringify(orderRequest),
      method: HttpMethod.Post,
    });
  }

  /**
   * Get order by ID
   * @param orderID Order ID
   * @returns
   */
  public get(orderID: string | number): Promise<Response> {
    const pathId =
      typeof orderID === "string"
        ? encodeURIComponent(orderID)
        : String(orderID);
    return this._execute(`/orders/${pathId}`, {
      method: HttpMethod.Get,
    });
  }

  /**
   * Get all Orders
   * @param orderQuery Query Params
   * @returns
   */
  public getAll(orderQuery?: OrderQuery): Promise<Response> {
    //Get one Product
    let path = "/orders";
    if (orderQuery) {
      const params = new URLSearchParams();
      if (orderQuery.status) params.set("status", orderQuery.status);
      if (orderQuery.offset) params.set("offset", orderQuery.offset);
      if (orderQuery.limit) params.set("limit", orderQuery.limit);
      const queryString = params.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }

    return this._execute(path.toString(), {
      method: HttpMethod.Get,
    });
  }

  /**
   * Update order data
   * @param orderID Order ID
   * @param orderRequest Order update request object
   * @param options Optional update options
   * @returns
   */
  public update(
    orderID: string | number,
    orderRequest: OrderRequest,
    options?: UpdateOrderOptions
  ): Promise<Response> {
    const pathId =
      typeof orderID === "string"
        ? encodeURIComponent(orderID)
        : String(orderID);
    let path = `/orders/${pathId}`;
    if (options) {
      const params = new URLSearchParams();
      if (options.confirm !== undefined) {
        params.set("confirm", options.confirm ? "true" : "false");
      }
      const queryString = params.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }
    return this._execute(path, {
      body: JSON.stringify(orderRequest),
      method: HttpMethod.Put,
    });
  }

  /**
   * Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment
   * @param orderID Order ID
   * @returns
   */
  public confirm(orderID: string | number): Promise<Response> {
    const pathId =
      typeof orderID === "string"
        ? encodeURIComponent(orderID)
        : String(orderID);
    return this._execute(`/orders/${pathId}/confirm`, {
      method: HttpMethod.Post,
    });
  }

  /**
   * Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
   * @param orderID Order ID
   * @returns
   */
  public cancel(orderID: string | number): Promise<Response> {
    const pathId =
      typeof orderID === "string"
        ? encodeURIComponent(orderID)
        : String(orderID);
    return this._execute(`/orders/${pathId}`, {
      method: HttpMethod.Delete,
    });
  }
}

export { Orders };
