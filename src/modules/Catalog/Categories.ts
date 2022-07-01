/**
 * Printful Product
 */

import { BaseModule } from "../BaseModule";
import { RequestHelper } from "../../RequestHelper";

class Categories extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  get(id: number): Promise<Response> {
    //Get one Category
    return this._execute(`/categories/${id}`, {
      method: "Get",
    });
  }

  getAll(): Promise<Response> {
    //Get all Categories
    return this._execute("/categories", {
      method: "Get",
    });
  }
}

export { Categories };
