import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetShippingListInfoResponse } from "../schemas";

export { GetShippingListInfoResponse };
export type GetShippingListInfoResponseType = Schema.Schema.Type<
  typeof GetShippingListInfoResponse
>;

/**
 * Retrieve available shipping list information
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the shipping list information
 *
 * @example
 * const shippingInfo = printify.v2.catalog.getShippingListInfo('3', '8');
 * // Expected response: [
 * //     {
 * //         "type": "shipping_method",
 * //         "id": "1",
 * //         "attributes": {
 * //             "name": "standard"
 * //         }
 * //     },
 * //     {
 * //         "type": "shipping_method",
 * //         "id": "2",
 * //         "attributes": {
 * //             "name": "priority"
 * //         }
 * //     },
 * //     {
 * //         "type": "shipping_method",
 * //         "id": "3",
 * //         "attributes": {
 * //             "name": "express"
 * //         }
 * //     },
 * //     {
 * //         "type": "shipping_method",
 * //         "id": "4",
 * //         "attributes": {
 * //             "name": "economy"
 * //         }
 * //     }
 * // ]
 */
const getShippingListInfo = (blueprintId: string, printProviderId: string) =>
  requestPrintify(
    GetShippingListInfoResponse,
    `/v2/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping.json`,
    { method: "GET" }
  );

export default getShippingListInfo;
