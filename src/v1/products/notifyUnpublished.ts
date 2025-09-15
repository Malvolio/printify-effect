import { requestPrintify } from "../../common/requestPrintify";
import { EmptyResponse } from "../schemas";

/**
 * Notify that a product has been unpublished
 *
 * @param {string} productId - The ID of the product to notify
 * @returns Effect that yields an empty response
 *
 * @example
 * const productId = "5d39b159e7c48c000728c89f";
 * const result = printify.products.notifyUnpublished(productId);
 * // Expected response: {}
 */
const notifyUnpublished = (productId: string) =>
  requestPrintify(
    EmptyResponse,
    `/v1/shops/{shopId}/products/${productId}/unpublish.json`,
    {
      method: "POST",
    }
  );

export default notifyUnpublished;
