import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetBlueprintProviderResponse } from "../schemas";

export { GetBlueprintProviderResponse };
export type GetBlueprintProviderResponseType = Schema.Schema.Type<
  typeof GetBlueprintProviderResponse
>;

/**
 * Retrieve a list of all print providers that fulfill orders for a specific blueprint
 *
 * @param {string} blueprintId - The ID of the blueprint to retrieve print providers for
 * @returns Effect that yields the list of print providers
 *
 * @example
 * const blueprintId = "3";
 * const providers = printify.catalog.getBlueprintProviders(blueprintId);
 * console.log(providers);
 * // Expected response:
 * // [
 * //   { "id": 3, "title": "DJ" },
 * //   { "id": 8, "title": "Fifth Sun" },
 * //   { "id": 16, "title": "MyLocker" },
 * //   { "id": 24, "title": "Inklocker" }
 * // ]
 */
const getBlueprintProviders = (blueprintId: string) =>
  requestPrintify(
    GetBlueprintProviderResponse,
    `/v1/catalog/blueprints/${blueprintId}/print_providers.json`,
    { method: "GET" }
  );

export default getBlueprintProviders;
