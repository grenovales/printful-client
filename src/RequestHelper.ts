/***
 * Helper to send API request
 */
import fetch, { Headers } from "cross-fetch";

class RequestHelper {
  private headers: Headers;
  private apiUrl: string;

  constructor(apiToken: string, storeID?: string) {
    this.headers = new Headers();
    this.headers.append("Authorization", `Bearer ${apiToken}`);
    this.headers.append("content_type", "application/json");
    if (storeID) {
      this.headers.append("X-PF-Store-Id", storeID);
    }

    this.apiUrl = "https://api.printful.com";
  }

  request(path: string, options?: RequestInit | undefined): Promise<Response> {
    return fetch(`${this.apiUrl}${path}`, {
      headers: this.headers,
      ...options,
    });
  }
}

export { RequestHelper };
