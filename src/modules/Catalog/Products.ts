/**
 * Printful Product
 */

import { BaseModule } from "../BaseModule";
import { Variants } from "./Variants";
import { RequestHelper } from "../../RequestHelper";

type ProductQuery = {
  offset?: string;
  limit?: string;
  category_id?: string | number | Array<string | number>;
};

type MeasurementUnit = "inches" | "cm";

class Products extends BaseModule {
  public variants: Variants;

  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
    this.variants = new Variants(requestHelper);
  }

  public get(id: number): Promise<Response> {
    //Get one Product
    return this._execute(`/products/${id}`, {
      method: "Get",
    });
  }

  public getAll(productQuery?: ProductQuery): Promise<Response> {
    //Get all Products
    let path = "/products";
    if (productQuery) {
      const params = new URLSearchParams();
      if (productQuery.offset) params.set("offset", productQuery.offset);
      if (productQuery.limit) params.set("limit", productQuery.limit);
      if (productQuery.category_id != null) {
        const categoryValue = Array.isArray(productQuery.category_id)
          ? productQuery.category_id.join(",")
          : productQuery.category_id.toString();
        params.set("category_id", categoryValue);
      }
      const queryString = params.toString();
      if (queryString) {
        path += `?${queryString}`;
      }
    }
    return this._execute(path, {
      method: "Get",
    });
  }

  public getSizes(id: number, unit?: MeasurementUnit): Promise<Response> {
    const params = new URLSearchParams();
    if (unit) params.set("unit", unit);
    const queryString = params.toString();
    const path = `/products/${id}/sizes${
      queryString ? `?${queryString}` : ""
    }`;
    return this._execute(path, {
      method: "Get",
    });
  }
}

export { Products };
