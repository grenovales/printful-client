/**
 * Country/State Code API – list countries and states accepted by Printful for orders.
 * Country codes: ISO 3166-1 alpha-2. State codes: ISO 3166-2 (USA, Canada, Japan, Australia).
 * @see https://developers.printful.com/docs/#tag/CountryState-Code-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

class CountryStateCode extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Retrieve list of countries and states accepted by Printful for orders.
   * GET /countries
   */
  public getCountries(): Promise<Response> {
    return this._execute("/countries", { method: HttpMethod.Get });
  }
}

export { CountryStateCode };
