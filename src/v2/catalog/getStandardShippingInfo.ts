import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetStandardShippingInfoResponse } from "../schemas";

export { GetStandardShippingInfoResponse };
export type GetStandardShippingInfoResponseType = Schema.Schema.Type<
  typeof GetStandardShippingInfoResponse
>;

/**
 * Retrieve standard shipping method information
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the standard shipping information
 *
 * @example
 * const shippingInfo = printify.v2.catalog.getStandardShippingInfo('3', '8');
 * // Expected response: [
 * //     {
 * //         "type": "variant_shipping_standard_us",
 * //         "id": "23494",
 * //         "attributes": {
 * //             "shippingType": "standard",
 * //             "country": {
 * //                 "code": "US"
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
const getStandardShippingInfo = (
  blueprintId: string,
  printProviderId: string
) =>
  requestPrintify(
    GetStandardShippingInfoResponse,
    `/v2/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping/standard.json`,
    { method: "GET" }
  );

export default getStandardShippingInfo;
