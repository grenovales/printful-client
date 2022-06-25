/**
 * Printfull Tax Calculator
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

type TaxRequest = {
  recipient: {
    country_code: string;
    state_code: string;
    city: string;
    zip: string;
  };
};
class Tax extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get Tax Rate
   * @param taxRequest Get tax rate request
   * @returns Response Object with tax rate information
   */
  getRate(taxRequest: TaxRequest) {
    return this._execute(`/tax/rates`, {
      body: JSON.stringify(taxRequest),
      method: "Post",
    });
  }
}

export { Tax };
