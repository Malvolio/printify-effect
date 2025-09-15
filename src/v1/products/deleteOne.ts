import { requestPrintify } from "../../common/requestPrintify";
import { ProductId } from "../brands";
import { EmptyResponse } from "../schemas";

/**
 * Delete a product
 *
 * @param {string} productId - The ID of the product to be deleted
 * @returns Effect that yields an empty response
 *
 * @example
 * const productId = "5cb87a8cd490a2ccb256cec4" as ProductId;
 * const result = printify.products.deleteOne(productId);
 * // Expected response: {}
 */
const deleteOne = (productId: ProductId) =>
  requestPrintify(
    EmptyResponse,
    `/v1/shops/{shopId}/products/${productId}.json`,
    {
      method: "DELETE",
    }
  );

export default deleteOne;
