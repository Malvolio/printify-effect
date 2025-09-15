import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetPriorityShippingInfoResponse } from "../schemas";

export { GetPriorityShippingInfoResponse };
export type GetPriorityShippingInfoResponseType = Schema.Schema.Type<
  typeof GetPriorityShippingInfoResponse
>;

/**
 * Retrieve priority shipping method information
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the priority shipping information
 *
 * @example
 * const shippingInfo = printify.v2.catalog.getPriorityShippingInfo('3', '8');
 * // Expected response: [
 * // [
 * //     {
 * //         "type": "variant_shipping_priority_us",
 * //         "id": "23494",
 * //         "attributes": {
 * //             "shippingType": "priority",
 * //             "country": {
 * //               "code": "US"
 * //             },
 * //             "variantId": 23494,
 * //             "shippingPlanId": "65a7c0825b50fcd56a018e02",
 * //             "handlingTime": {
 * //                 "from": 4,
 * //                 "to": 8
 * //             },
 * //             "shippingCost": {
 * //                 "firstItem": {
 * //                     "amount": 399,
 * //                     "currency": "USD"
 * //                 },
 * //                 "additionalItems": {
 * //                     "amount": 219,
 * //                     "currency": "USD"
 * //                 }
 * //             }
 * //         }
 * //     }
 * // ]
 */
const getPriorityShippingInfo = (
  blueprintId: string,
  printProviderId: string
) =>
  requestPrintify(
    GetPriorityShippingInfoResponse,
    `/v2/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping/priority.json`,
    { method: "GET" }
  );

export default getPriorityShippingInfo;
