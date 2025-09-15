import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListOrdersResponse } from "../schemas";

export type ListOrdersResponseType = Schema.Schema.Type<
  typeof ListOrdersResponse
>;

/**
 * Retrieve a list of orders
 *
 * @param {Object} options - Query options for listing orders
 * @param {number} [options.page] - The page number of orders to retrieve
 * @param {number} [options.limit] - Number of orders per page
 * @param {string} [options.status] - Filter by order status
 * @param {string} [options.sku] - Filter by SKU
 * @returns Effect that yields a paginated list of orders
 *
 * @example
 * const orders = printify.orders.list();
 * // Expected response: {
 *     current_page: 2,
 *     data: [ { id: "5a96f649b2439217 } ]
 * }
 * printify.orders.list({ page: 2 });
 * printify.orders.list({ limit: 5 });
 * printify.orders.list({ status: "fulfilled" });
 * printify.orders.list({ sku: "168699843" });
 */
const list = (
  options: { page?: number; limit?: number; status?: string; sku?: string } = {}
) => {
  const { page, limit, status, sku } = options;
  const queryParams = new URLSearchParams({
    ...(page !== undefined && { page: page.toString() }),
    ...(limit !== undefined && { limit: limit.toString() }),
    ...(status !== undefined && { status }),
    ...(sku !== undefined && { sku }),
  }).toString();

  return requestPrintify(
    ListOrdersResponse,
    `/v1/shops/{shopId}/orders.json${queryParams ? `?${queryParams}` : ""}`,
    { method: "GET" }
  );
};

export default list;
