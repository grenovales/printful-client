/***
 * Helper to send API request
 */
import fetch, { Headers } from "cross-fetch";

class RequestHelper {
  private headers: Headers;
  private baseUrl: string;

  constructor(apiToken: string, storeID?: string, apiVersion?: string) {
    this.headers = new Headers();
    this.headers.append("Authorization", `Bearer ${apiToken}`);
    this.headers.append("content_type", "application/json");
    if (storeID) {
      this.headers.append("X-PF-Store-Id", storeID);
    }

    const versionPath =
      apiVersion != null
        ? `/${apiVersion.replace(/^\//, "")}`
        : "";
    this.baseUrl = `https://api.printful.com${versionPath}`;
  }

  request(path: string, options?: RequestInit | undefined): Promise<Response> {
    return fetch(`${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
      headers: this.headers,
      ...options,
    });
  }
}

export { RequestHelper };
