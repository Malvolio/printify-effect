import { requestPrintify } from "../../common/requestPrintify";
import { EmptyResponse } from "../schemas";
import { ExternalProductData } from "../types";

export type PublishSucceededData = {
  external: ExternalProductData;
};

/**
 * Set product publish status to succeeded. Removes the product from the locked status on the Printify app and sets its external property with the handle you provide in the request body.
 *
 * @param {string} productId - The ID of the product to update
 * @param {PublishSucceededData} data - Data containing external properties to set
 * @returns Effect that yields an empty response
 *
 * @example
 * const data = { external: { id: '5941187eb8e7e37b3f0e62e5', handle: 'https://example.com/path/to/product' } };
 * const result = printify.products.setPublishSucceeded('productId', data);
 * // Expected response: {}
 */
const setPublishSucceeded = (productId: string, data: PublishSucceededData) =>
  requestPrintify(
    EmptyResponse,
    `/v1/shops/{shopId}/products/${productId}/publishing_succeeded.json`,
    {
      method: "POST",
      data,
    }
  );

export default setPublishSucceeded;
