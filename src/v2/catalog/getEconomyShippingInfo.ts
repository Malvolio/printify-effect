import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetEconomyShippingInfoResponse } from "../schemas";

export { GetEconomyShippingInfoResponse };
export type GetEconomyShippingInfoResponseType = Schema.Schema.Type<
  typeof GetEconomyShippingInfoResponse
>;

/**
 * Retrieve economy shipping method information
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the economy shipping information
 *
 * @example
 * const shippingInfo = printify.v2.catalog.getEconomyShippingInfo('3', '8');
 * // Expected response: [
 * // [
 * //   {
 * //       "type": "variant_shipping_economy_us",
 * //       "id": "23494",
 * //       "attributes": {
 * //           "shippingType": "economy",
 * //           "country": {
 * //               "code": "US"
 * //           },
 * //           "variantId": 23494,
 * //           "shippingPlanId": "65a7c0825b50fcd56a018e02",
 * //           "handlingTime": {
 * //               "from": 4,
 * //               "to": 8
 * //           },
 * //           "shippingCost": {
 * //               "firstItem": {
 * //                   "amount": 399,
 * //                   "currency": "USD"
 * //               },
 * //               "additionalItems": {
 * //                   "amount": 219,
 * //                   "currency": "USD"
 * //               }
 * //           }
 * //       }
 * //   }
 * // ]
 */
const getEconomyShippingInfo = (blueprintId: string, printProviderId: string) =>
  requestPrintify(
    GetEconomyShippingInfoResponse,
    `/v2/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping/economy.json`,
    { method: "GET" }
  );

export default getEconomyShippingInfo;
