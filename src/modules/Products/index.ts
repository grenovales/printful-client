/**
 * Printfull Product
 */

import { BaseModule } from "../BaseModule";
import { Variants } from "./Variants";
import { RequestHelper } from "../../RequestHelper";

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

  getAll(): Promise<Response> {
    //Get all Products
    return this._execute(`/store/products`, {
      method: "Get",
    });
  }
}

export { Products };
