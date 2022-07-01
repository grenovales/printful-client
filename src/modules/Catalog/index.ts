/**
 * Printful Catalog
 */
import { BaseModule } from "../BaseModule";
import { Products } from "./Products";
import { Categories } from "./Categories";
import { RequestHelper } from "../../RequestHelper";

class Catalog extends BaseModule {
  public products: Products;
  public categories: Categories;

  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
    this.products = new Products(requestHelper);
    this.categories = new Categories(requestHelper);
  }
}

export { Catalog };
