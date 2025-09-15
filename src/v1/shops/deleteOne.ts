import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";

// Define a void response schema for delete operations
const DeleteShopResponse = Schema.Struct({});
export type DeleteShopResponseType = Schema.Schema.Type<
  typeof DeleteShopResponse
>;

/**
 * Disconnect a shop
 *
 * @param {string} shopId - The ID of the shop to disconnect
 * @returns Effect that yields the deletion response
 *
 * @example
 * const customShopId = "67890";
 * const deleteEffect = printify.shops.deleteOne(customShopId);
 * // Expected response: {}
 */
const deleteOne = (customShopId?: string) =>
  requestPrintify(
    DeleteShopResponse,
    `/v1/shops/${customShopId ?? "{shopId}"}/connection.json`,
    {
      method: "DELETE",
    }
  );

export default deleteOne;
