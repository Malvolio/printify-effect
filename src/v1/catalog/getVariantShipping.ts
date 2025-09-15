import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetVariantShippingResponse } from "../schemas";

export { GetVariantShippingResponse };
export type GetVariantShippingResponseType = Schema.Schema.Type<
  typeof GetVariantShippingResponse
>;

/**
 * Retrieve the shipping information for all variants of a blueprint from a specific print provider
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the variant shipping information
 *
 * @example
 * const blueprintId = "3";
 * const printProviderId = "8";
 * const shipping = printify.catalog.getVariantShipping(blueprintId, printProviderId);
 * console.log(shipping);
 * // Expected response:
 * // {
 * //   "handling_time": { "value": 30, "unit": "day" },
 * //   "profiles": [
 * //     { "variant_ids": [ list of variant IDs ], "first_item": { "cost": 450, "currency": "USD" }, "additional_items": { "cost": 0, "currency": "USD" }, "countries": ["US"] },
 * //     { "variant_ids": [ list of variant IDs ], "first_item": { "cost": 650, "currency": "USD" }, "additional_items": { "cost": 0, "currency": "USD" }, "countries": [ list of countries ] },
 * //     { "variant_ids": [ list of variant IDs ], "first_item": { "cost": 1100, "currency": "USD" }, "additional_items": { "cost": 0, "currency": "USD" }, "countries": ["REST_OF_THE_WORLD"] }
 * //   ]
 * // }
 */
const getVariantShipping = (blueprintId: string, printProviderId: string) =>
  requestPrintify(
    GetVariantShippingResponse,
    `/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/shipping.json`,
    { method: "GET" }
  );

export default getVariantShipping;
