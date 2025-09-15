import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { WebhookId } from "../brands";
import { DeleteWebhookResponse } from "../schemas";

export type DeleteWebhookResponseType = Schema.Schema.Type<
  typeof DeleteWebhookResponse
>;

/**
 * Delete a webhook
 *
 * @param {string} webhookId - The ID of the webhook to be deleted
 * @param {string} host - The hostname of the webhook to be deleted (optional)
 * @returns Effect that yields the deletion response
 *
 * @example
 * const webhookEffect = printify.webhooks.deleteOne('5cb87a8cd490a2ccb256cec4');
 * // Expected response:
 * // {
 * //   "message": "Webhook deleted successfully"
 * // }
 */
const deleteOne = (webhookId: WebhookId, host?: string) => {
  const query = host ? `?host=${encodeURIComponent(host)}` : "";
  return requestPrintify(
    DeleteWebhookResponse,
    `/v1/shops/{shopId}/webhooks/${webhookId}.json${query}`,
    {
      method: "DELETE",
    }
  );
};

export default deleteOne;
