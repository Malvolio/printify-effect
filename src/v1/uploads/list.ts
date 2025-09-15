import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListUploadsResponse } from "../schemas";

export type ListUploadsResponseType = Schema.Schema.Type<
  typeof ListUploadsResponse
>;

/**
 * Retrieve a list of uploaded images with optional pagination and limit.
 *
 * @param {number} [page] - Page number
 * @param {number} [limit] - Results per page
 * @returns Effect that yields a paginated list of uploads
 *
 * @example
 * const uploadsEffect = printify.uploads.list();
 * const paginatedEffect = printify.uploads.list(2);
 * const limitedEffect = printify.uploads.list(undefined, 5);
 *
 * // Expected response:
 * // {
 * //   "current_page": 1,
 * //   "data": [ { "id": "5e16d66791287a0006e522b2", "file_name": "png-images-logo-1.jpg" }, ... ],
 * //   "total": 2
 * // }
 */
const list = (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());

  const url = `/v1/uploads.json${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return requestPrintify(ListUploadsResponse, url, { method: "GET" });
};

export default list;
