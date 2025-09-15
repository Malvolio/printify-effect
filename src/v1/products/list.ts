import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListProductsResponse } from "../schemas";

export type ListProductsResponseType = Schema.Schema.Type<
  typeof ListProductsResponse
>;

/**
 * Retrieve a list of all products with optional pagination and limit.
 *
 * @param {{ page?: number; limit?: number }} [option] - pagination and limit options
 * @returns Effect that yields a paginated list of products
 *
 * @example
 * const products = printify.products.list();
 * const paginated = printify.products.list({ page: 2 });
 * const limited = printify.products.list({ limit: 5 });
 *
 * // Expected response:
 * // {
 * //   "current_page": 2,
 * //   "data": [ { "id": "5d39b159e7c48c000728c89f", "title": "Mug 11oz", ... }, ... ],
 * //   "total": 22
 * // }
 */
const list = (options: { page?: number; limit?: number } = {}) => {
  const { page, limit } = options;
  const queryParams = new URLSearchParams({
    ...(page !== undefined && { page: page.toString() }),
    ...(limit !== undefined && { limit: limit.toString() }),
  }).toString();

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return requestPrintify(
    ListProductsResponse,
    `/v1/shops/{shopId}/products.json${query}`,
    {
      method: "GET",
    }
  );
};

export default list;
