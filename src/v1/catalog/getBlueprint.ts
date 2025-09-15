import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { GetBlueprintResponse } from "../schemas";

export { GetBlueprintResponse };
export type GetBlueprintResponseType = Schema.Schema.Type<
  typeof GetBlueprintResponse
>;

/**
 * Retrieve a specific blueprint
 *
 * @param {string} blueprintId - The ID of the blueprint to retrieve
 * @returns Effect that yields the blueprint details
 *
 * @example
 * const blueprintId = "3";
 * const blueprint = printify.catalog.getBlueprint(blueprintId);
 * // Expected response:
 * // {
 * //   "id": 3,
 * //   "title": "Kids Regular Fit Tee",
 * //   "description": "Description goes here",
 * //   "brand": "Delta",
 * //   "model": "11736",
 * //   "images": ["https://images.printify.com/5853fe7dce46f30f8327f5cd", "https://images.printify.com/5c487ee2a342bc9b8b2fc4d2"]
 * // }
 */
const getBlueprint = (blueprintId: string) =>
  requestPrintify(
    GetBlueprintResponse,
    `/v1/catalog/blueprints/${blueprintId}.json`,
    {
      method: "GET",
    }
  );

export default getBlueprint;
