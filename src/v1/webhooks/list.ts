import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListWebhooksResponse } from "../schemas";

export type ListWebhooksResponseType = Schema.Schema.Type<
  typeof ListWebhooksResponse
>;

/**
 * Retrieve a list of webhooks
 *
 * @returns Effect that yields an array of webhooks
 *
 * @example
 * const webhooksEffect = printify.webhooks.list();
 * // Expected response:
 * // [
 * //   { "topic": "order:created", "url": "https://example.com/webhooks/order/created", "shop_id": "1", "id": "5cb87a8cd490a2ccb256cec4" },
 * //   { "topic": "order:updated", "url": "https://example.com/webhooks/order/updated", "shop_id": "1", "id": "5cb87a8cd490a2ccb256cec5" }
 * // ]
 */
const list = () =>
  requestPrintify(ListWebhooksResponse, `/v1/shops/{shopId}/webhooks.json`, {
    method: "GET",
  });

export default list;
