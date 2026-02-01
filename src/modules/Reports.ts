/**
 * Reports API – statistics for orders fulfilled for your stores.
 * @see https://developers.printful.com/docs/#tag/Reports-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

/** Report type for statistics (comma-separated in API). */
export type ReportType =
  | "sales_and_costs"
  | "sales_and_costs_summary"
  | "printful_costs"
  | "profit"
  | "total_paid_orders"
  | "costs_by_amount"
  | "costs_by_product"
  | "costs_by_variant"
  | "average_fulfillment_time";

/** Query params for getStatistics. Period cannot exceed 6 months. */
export type StatisticsQuery = {
  /** Report types to retrieve (comma-separated or array; array will be joined). */
  report_types: string | ReportType[];
  /** Start of period (Y-m-d, e.g. "2022-08-01"). */
  date_from: string;
  /** End of period (Y-m-d, e.g. "2022-08-31"). */
  date_to: string;
  /** Currency (3-letter code) or "display_currency" for account display currency. Default: store currency. */
  currency?: string;
};

class Reports extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Get statistics for specified report types and date range.
   * GET /reports/statistics
   * Period cannot be longer than 6 months.
   */
  public getStatistics(query: StatisticsQuery): Promise<Response> {
    const params = new URLSearchParams();
    const reportTypes =
      typeof query.report_types === "string"
        ? query.report_types
        : query.report_types.join(",");
    params.set("report_types", reportTypes);
    params.set("date_from", query.date_from);
    params.set("date_to", query.date_to);
    if (query.currency != null) params.set("currency", query.currency);
    const qs = params.toString();
    return this._execute(`/reports/statistics?${qs}`, { method: "Get" });
  }
}

export { Reports };
