/**
 * Mockup Generator API – printfiles, create mockup tasks, retrieve task results.
 * @see https://developers.printful.com/docs/#tag/Mockup-Generator-API
 */

import { BaseModule } from "./BaseModule";
import { RequestHelper } from "../RequestHelper";

/** Position for a file in the mockup generation task. */
export type MockupTaskFilePosition = {
  area_width?: number | null;
  area_height?: number | null;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  limit_to_print_area?: boolean;
};

/** File entry for mockup generation (placement, image URL, position). */
export type MockupTaskFile = {
  placement: string;
  image_url: string;
  position?: MockupTaskFilePosition;
  options?: Array<{ id: string; value: string }>;
};

/** Request body for creating a mockup generation task (POST /mockup-generator/create-task/{id}). */
export type CreateMockupTaskRequest = {
  /** Variant IDs to generate mockups for. */
  variant_ids: number[];
  /** Output format: jpg (smaller) or png (transparent background). */
  format: "jpg" | "png";
  /** Width of resulting mockup images (min 50, max 2000, default 1000). */
  width?: number;
  /** Key-value product options (e.g. embroidery thread, stitch colors). */
  product_options?: Record<string, unknown>;
  /** Option group names to generate (from printfile API). */
  option_groups?: string[];
  /** Option names to generate (from printfile API). */
  options?: string[];
  /** Attached printfiles / preview images. Use instead of product_template_id. */
  files?: MockupTaskFile[];
  /** Product template ID. Use instead of files. */
  product_template_id?: number;
};

/** Query params for getPrintfiles (orientation, technique). */
export type PrintfilesQuery = {
  /** Wall art orientation: horizontal or vertical. */
  orientation?: "horizontal" | "vertical";
  /** Printing technique (e.g. when product has DTG and embroidery). */
  technique?: string;
};

class MockupGenerator extends BaseModule {
  constructor(requestHelper: RequestHelper) {
    super(requestHelper);
  }

  /**
   * Create an asynchronous mockup generation task.
   * POST /mockup-generator/create-task/{id}
   * Rate limit: up to 10 req/60s (established stores), 2 req/60s (new stores). Use getTask(task_key) to poll result.
   */
  public createTask(
    productId: number,
    body: CreateMockupTaskRequest
  ): Promise<Response> {
    return this._execute(`/mockup-generator/create-task/${productId}`, {
      body: JSON.stringify(body),
      method: "Post",
    });
  }

  /**
   * Retrieve product variant printfiles (resolution/specs for mockups or orders).
   * GET /mockup-generator/printfiles/{id}
   * Uses DTG as default technique when product has multiple; pass technique to override.
   */
  public getPrintfiles(
    productId: number,
    query?: PrintfilesQuery
  ): Promise<Response> {
    let path = `/mockup-generator/printfiles/${productId}`;
    if (query) {
      const params = new URLSearchParams();
      if (query.orientation != null) params.set("orientation", query.orientation);
      if (query.technique != null) params.set("technique", query.technique);
      const qs = params.toString();
      if (qs) path += `?${qs}`;
    }
    return this._execute(path, { method: "Get" });
  }

  /**
   * Get mockup generation task result (poll after createTask).
   * GET /mockup-generator/task?task_key=...
   */
  public getTask(taskKey: string): Promise<Response> {
    const params = new URLSearchParams({ task_key: taskKey });
    return this._execute(`/mockup-generator/task?${params.toString()}`, {
      method: "Get",
    });
  }
}

export { MockupGenerator };
