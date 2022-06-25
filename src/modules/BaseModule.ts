import { RequestHelper } from "../RequestHelper";

export class BaseModule {
  private requestHelper: RequestHelper;
  constructor(requestHelper: RequestHelper) {
    this.requestHelper = requestHelper;
  }

  protected _execute(
    path: string,
    options?: RequestInit | undefined
  ): Promise<Response> {
    return this.requestHelper.request(path, options);
  }
}
