import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { SendOrderToProductionResponse } from "../schemas";

export type SendOrderToProductionResponseType = Schema.Schema.Type<
  typeof SendOrderToProductionResponse
>;

/**
 * Send an existing order to production
 *
 * @param {string} orderId - The ID of the order to be sent to production
 * @returns Effect that yields the order sent to production response
 *
 * @example
 * const orderId = "5d65c6ac01b403000a5d24d3";
 * const result = printify.orders.sendToProduction(orderId);
 * // Expected response: { id: "5d65c6ac01b403000a5d24d3", ... }
 */
const sendToProduction = (orderId: string) => {
  return requestPrintify(
    SendOrderToProductionResponse,
    `/v1/shops/{shopId}/orders/${orderId}/send_to_production.json`,
    { method: "POST" }
  );
};

export default sendToProduction;
