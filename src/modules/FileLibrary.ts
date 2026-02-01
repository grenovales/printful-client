/**
 * File Library API – add files by URL, get file info, suggest thread colors.
 * @see https://developers.printful.com/docs/#tag/File-Library-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper, HttpMethod } from "../RequestHelper";

/** File option when adding a file (e.g. template_type). */
export type FileOption = {
  id: string;
  value: string;
};

/** Request body for adding a file to the library (POST /files). */
export type AddFileRequest = {
  /** Source URL to download the file from. */
  url: string;
  /** Additional options for this file. */
  options?: FileOption[];
  /** File name. */
  filename?: string;
  /** Show file in the Printfile Library (default true). */
  visible?: boolean;
};

/** Request body for thread colors suggestion (POST /files/thread-colors). */
export type ThreadColorsRequest = {
  /** URL to the image file. */
  file_url: string;
};

class FileLibrary extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Add a new file to the library by URL.
   * POST /files
   * If a file with the same URL exists, the existing file is returned.
   */
  public add(body: AddFileRequest): Promise<Response> {
    return this._execute("/files", {
      body: JSON.stringify(body),
      method: HttpMethod.Post,
    });
  }

  /**
   * Get information about a file by ID.
   * GET /files/{id}
   */
  public get(id: number): Promise<Response> {
    return this._execute(`/files/${id}`, { method: HttpMethod.Get });
  }

  /**
   * Return suggested thread colors (hex) from an image URL.
   * POST /files/thread-colors
   */
  public getThreadColors(body: ThreadColorsRequest): Promise<Response> {
    return this._execute("/files/thread-colors", {
      body: JSON.stringify(body),
      method: HttpMethod.Post,
    });
  }
}

export { FileLibrary };
