/**
 * Printful Product
 */

import { BaseModule } from "../BaseModule";
import { RequestHelper, HttpMethod } from "../../RequestHelper";

class Categories extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  get(id: number): Promise<Response> {
    //Get one Category
    return this._execute(`/categories/${id}`, {
      method: HttpMethod.Get,
    });
  }

  getAll(): Promise<Response> {
    //Get all Categories
    return this._execute("/categories", {
      method: HttpMethod.Get,
    });
  }
}

export { Categories };
