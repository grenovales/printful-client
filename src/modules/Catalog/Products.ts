/**
 * Printful Product
 */

import { BaseModule } from "../BaseModule";
import { Variants } from "./Variants";
import { RequestHelper } from "../../RequestHelper";

type ProductQuery = {
  offset?: string;
  limit?: string;
};

class Products extends BaseModule {
  public variants: Variants;

  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
    this.variants = new Variants(requestHelper);
  }

  get(id: number): Promise<Response> {
    //Get one Product
    return this._execute(`/products/${id}`, {
      method: "Get",
    });
  }

  getAll(): Promise<Response> {
    //Get all Products
    return this._execute("/products", {
      method: "Get",
    });
  }
}

export { Products };
