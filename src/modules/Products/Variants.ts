/**
 * Printful Product Variant
 */
import { BaseModule } from "../BaseModule";
import { RequestHelper } from "../../RequestHelper";

type ItemOptionValue = string | number | boolean | Array<string | number | boolean>;

type ItemOption = {
  id: string;
  value: ItemOptionValue;
};

type FileOption = {
  id: string;
  value: ItemOptionValue;
};

type ProductFile = {
  id?: number;
  type?: string;
  url?: string;
  filename?: string;
  visible?: boolean;
  options?: FileOption[];
};

type SyncVariantUpdateRequest = {
  variant_id?: number;
  retail_price?: string | number;
  sku?: string | null;
  is_ignored?: boolean;
  files?: ProductFile[];
  options?: ItemOption[];
  warehouse_product_variant_id?: number | null;
};

class Variants extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get Product Variant by ID
   * @param id Variant ID, See Printful API Documentation
   * @returns Response Object with Variant Information
   */
  public get(id: string): Promise<Response> {
    return this._execute(`/store/variants/${id}`, {
      method: "Get",
    });
  }

  public update(
    id: string | number,
    payload: SyncVariantUpdateRequest
  ): Promise<Response> {
    return this._execute(`/store/variants/${id}`, {
      body: JSON.stringify(payload),
      method: "Put",
    });
  }

  public delete(id: string | number): Promise<Response> {
    return this._execute(`/store/variants/${id}`, {
      method: "Delete",
    });
  }
}

export { Variants };
