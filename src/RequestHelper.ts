/***
 * Helper to send API request
 */
import fetch, { Headers } from "cross-fetch";

/** HTTP method enum; values are uppercase for request use. */
export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

type PrintfulErrorResponse = {
  code?: number;
  result?: string;
  error?: {
    reason?: string;
    message?: string;
  };
};

export class PrintfulApiError extends Error {
  public status: number;
  public code?: number;
  public result?: string;
  public reason?: string;

  constructor(status: number, payload?: PrintfulErrorResponse, fallback?: string) {
    const message =
      payload?.error?.message ??
      payload?.result ??
      fallback ??
      `Request failed with status ${status}`;
    super(message);
    this.name = "PrintfulApiError";
    this.status = status;
    this.code = payload?.code;
    this.result = payload?.result;
    this.reason = payload?.error?.reason;
  }
}

class RequestHelper {
  private headers: Headers;
  private baseUrl: string;

  constructor(
    apiToken: string,
    storeID?: string,
    apiVersion?: string,
    locale?: string
  ) {
    this.headers = new Headers();
    this.headers.append("Authorization", `Bearer ${apiToken}`);
    this.headers.append("Content-Type", "application/json");
    if (storeID) {
      this.headers.append("X-PF-Store-Id", storeID);
    }
    if (locale) {
      this.headers.append("X-PF-Language", locale);
    }

    const versionPath =
      apiVersion != null
        ? `/${apiVersion.replace(/^\//, "")}`
        : "";
    this.baseUrl = `https://api.printful.com${versionPath}`;
  }

  public request(
    path: string,
    options?: RequestInit | undefined
  ): Promise<Response> {
    const mergedHeaders = new Headers(this.headers);
    if (options?.headers) {
      const extra =
        options.headers instanceof Headers
          ? options.headers
          : new Headers(options.headers as HeadersInit);
      extra.forEach((value, key) => mergedHeaders.set(key, value));
    }
    const { headers: _o, ...rest } = options ?? {};
    return fetch(
      `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
      { ...rest, headers: mergedHeaders }
    );
  }

  public async requestJson<T>(
    path: string,
    options?: RequestInit | undefined
  ): Promise<T> {
    const response = await this.request(path, options);
    if (response.ok) {
      return (await response.json()) as T;
    }

    let payload: PrintfulErrorResponse | undefined;
    let fallback: string | undefined;
    try {
      payload = (await response.json()) as PrintfulErrorResponse;
    } catch {
      try {
        fallback = await response.text();
      } catch {
        fallback = undefined;
      }
    }

    throw new PrintfulApiError(response.status, payload, fallback);
  }
}

export { RequestHelper };
