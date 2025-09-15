import { requestPrintify } from "../../common/requestPrintify";
import { EmptyResponse } from "../schemas";

export interface ProductPublishData {
  title: boolean;
  description: boolean;
  images: boolean;
  variants: boolean;
  tags: boolean;
  keyFeatures: boolean;
  shipping_template: boolean;
}

/**
 * Publish a product
 *
 * @param {string} productId - The ID of the product to be published
 * @param {ProductPublishData} data - The data to be sent with the publish request
 * @returns Effect that yields an empty response
 *
 * @example
 * const data = { title: true, description: true, images: true, variants: true, tags: true, keyFeatures: true, shipping_template: true };
 * const result = printify.products.publishOne('productId', data);
 * // Expected response: {}
 */
const publishOne = (productId: string, data: ProductPublishData) =>
  requestPrintify(
    EmptyResponse,
    `/v1/shops/{shopId}/products/${productId}/publish.json`,
    {
      method: "POST",
      data,
    }
  );

export default publishOne;
