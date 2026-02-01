/**
 * Printfull Tax API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

class Tax extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get a list of countries for tax calculation
   * @returns Response Object with tax countries
   */
  public getCountries(): Promise<Response> {
    return this._execute(`/tax/countries`, {
      method: HttpMethod.Get,
    });
  }
}

export { Tax };
