import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetBlueprintVariantsResponse } from "../schemas";

export { GetBlueprintVariantsResponse };
export type GetBlueprintVariantsResponseType = Schema.Schema.Type<
  typeof GetBlueprintVariantsResponse
>;

/**
 * Retrieve a list of all variants of a blueprint from a specific print provider
 *
 * @param {string} blueprintId - The ID of the blueprint
 * @param {string} printProviderId - The ID of the print provider
 * @returns Effect that yields the blueprint variants
 *
 * @example
 * const blueprintId = "3";
 * const printProviderId = "8";
 * const variants = printify.catalog.getBlueprintVariants(blueprintId, printProviderId);
 * console.log(variants);
 * // Expected response:
 * // {
 * //   "id": 3,
 * //   "title": "DJ",
 * //   "variants": [
 * //     { "id": 17390, "title": "Heather Grey / XS", "options": { "color": "Heather Grey", "size": "XS" }, "placeholders": [ { "position": "back", "height": 3995, "width": 3153 }, { "position": "front", "height": 3995, "width": 3153 } ] },
 * //     // Additional variants...
 * //   ]
 * // }
 */
const getBlueprintVariants = (blueprintId: string, printProviderId: string) =>
  requestPrintify(
    GetBlueprintVariantsResponse,
    `/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`,
    { method: "GET" }
  );

export default getBlueprintVariants;
