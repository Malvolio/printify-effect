import { requestPrintify } from "../../common/requestPrintify";
import { EmptyResponse } from "../schemas";

export type PublishFailedData = {
  reason: string;
};

/**
 * Set product publish status to failed. Removes the product from the locked status on the Printify app.
 *
 * @param {string} productId - The ID of the product to update
 * @param {PublishFailedData} data - Data containing reason for the failure
 * @returns Effect that yields an empty response
 *
 * @example
 * const data = { reason: 'Request timed out' };
 * const result = printify.products.setPublishFailed('productId', data);
 * // Expected response: {}
 */
const setPublishFailed = (productId: string, data: PublishFailedData) =>
  requestPrintify(
    EmptyResponse,
    `/v1/shops/{shopId}/products/${productId}/publishing_failed.json`,
    {
      method: "POST",
      data,
    }
  );

export default setPublishFailed;
