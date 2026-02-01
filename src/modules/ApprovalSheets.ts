/**
 * Approval Sheets API – list approval sheets, approve designs, submit design changes.
 * @see https://developers.printful.com/docs/#tag/Approval-Sheets-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

/** Request body for approving a design (POST /approval-sheets). */
export type ApproveDesignRequest = {
  status: "approved";
};

/** File entry for approval sheet changes (image URL). */
export type ApprovalSheetChangeFile = {
  url: string;
};

/** Request body for submitting changes to an approval sheet (POST /approval-sheets/changes). */
export type SubmitApprovalSheetChangesRequest = {
  /** Message to Printful designers describing the changes you want. */
  message: string;
  /** Array of image URLs (e.g. from mockup generator). Required but can be empty. */
  files: ApprovalSheetChangeFile[];
};

class ApprovalSheets extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Retrieve a list of approval sheets (suggested changes to files of on-hold orders).
   * GET /approval-sheets
   */
  public getAll(): Promise<Response> {
    return this._execute("/approval-sheets", { method: HttpMethod.Get });
  }

  /**
   * Approve a design using the approval sheet confirm hash; removes the hold on the order.
   * POST /approval-sheets?confirm_hash=...
   */
  public approveDesign(confirmHash: string, body: ApproveDesignRequest): Promise<Response> {
    const params = new URLSearchParams({ confirm_hash: confirmHash });
    return this._execute(`/approval-sheets?${params.toString()}`, {
      body: JSON.stringify(body),
      method: HttpMethod.Post,
    });
  }

  /**
   * Submit alternative changes to a design that has an approval sheet.
   * POST /approval-sheets/changes?confirm_hash=...
   */
  public submitChanges(
    confirmHash: string,
    body: SubmitApprovalSheetChangesRequest
  ): Promise<Response> {
    const params = new URLSearchParams({ confirm_hash: confirmHash });
    return this._execute(`/approval-sheets/changes?${params.toString()}`, {
      body: JSON.stringify(body),
      method: HttpMethod.Post,
    });
  }
}

export { ApprovalSheets };
