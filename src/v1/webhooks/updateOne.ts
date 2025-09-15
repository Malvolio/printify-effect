import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { WebhookId } from "../brands";
import { UpdateWebhookResponse } from "../schemas";

export type UpdateWebhookResponseType = Schema.Schema.Type<
  typeof UpdateWebhookResponse
>;

/**
 * Modify a webhook
 *
 * @param {string} webhookId - The ID of the webhook to be updated
 * @param {{ url: string }} data - The data to update the webhook with
 * @returns Effect that yields the updated webhook
 *
 * @example
 * const data = { url: 'https://example.com/callback/order/created' };
 * const webhookEffect = printify.webhooks.updateOne('5cb87a8cd490a2ccb256cec4', data);
 * // Expected response:
 * // {
 * //   "topic": "order:created",
 * //   "url": "https://example.com/callback/order/created",
 * //   "shop_id": "1",
 * //   "id": "5cb87a8cd490a2ccb256cec4"
 * // }
 */
const updateOne = (webhookId: WebhookId, data: { url: string }) =>
  requestPrintify(
    UpdateWebhookResponse,
    `/v1/shops/{shopId}/webhooks/${webhookId}.json`,
    {
      method: "PUT",
      data,
    }
  );

export default updateOne;
