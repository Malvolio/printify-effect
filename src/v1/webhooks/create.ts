import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { CreateWebhookResponse } from "../schemas";
import { NewWebhook } from "../types";

export type CreateWebhookResponseType = Schema.Schema.Type<
  typeof CreateWebhookResponse
>;

/**
 * Create a new webhook
 *
 * @param {NewWebhook} data - The webhook data to be sent in the request body
 * @returns Effect that yields the created webhook
 *
 * @example
 * const data = { topic: "order:created", url: "https://example.com/webhooks/order/created" };
 * const webhookEffect = printify.webhooks.create(data);
 * // Expected response:
 * // {
 * //   "topic": "order:created",
 * //   "url": "https://example.com/webhooks/order/created",
 * //   "shop_id": "1",
 * //   "id": "5cb87a8cd490a2ccb256cec4"
 * // }
 */
const create = (data: NewWebhook) =>
  requestPrintify(CreateWebhookResponse, `/v1/shops/{shopId}/webhooks.json`, {
    method: "POST",
    data,
  });

export default create;
