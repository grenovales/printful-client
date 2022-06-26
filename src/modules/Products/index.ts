/**
 * Printfull Product
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

  get(id: string): Promise<Response> {
    //Get one Product
    return this._execute(`/store/products/${id}`, {
      method: "Get",
    });
  }

  getAll(productQuery?: ProductQuery): Promise<Response> {
    //Get all Products
    let path = `/store/products`;
    if (productQuery) {
      path += `?${new URLSearchParams(productQuery).toString()}`;
    }
    return this._execute(path, {
      method: "Get",
    });
  }
}

export { Products };
