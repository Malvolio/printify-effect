import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { UpdateProductResponse } from "../schemas";
import { UpdateProductData } from "../types";

export { UpdateProductResponse };
export type UpdateProductResponseType = Schema.Schema.Type<
  typeof UpdateProductResponse
>;

/**
 * Update a product
 *
 * @param {string} productId - The ID of the product to be updated
 * @param {UpdateProductData} data - The data to be sent with the update request
 * @returns Effect that yields the updated product
 *
 * @example
 * const data = { title: 'Product' };
 * const product = printify.products.updateOne('productId', data);
 * // Expected response: {
 * //   "id": "5d39b159e7c48c000728c89f",
 * //   "title": "Mug 11oz",
 * //   "description": "<desc>",
 * //   "options": [],
 * //   "variants": [],
 * //   "images": [],
 * //   "created_at": "2019-07-25 13:40:41+00:00",
 * //   "updated_at": "2019-07-25 13:40:59+00:00",
 * //   "blueprint_id": 68,
 * //   "user_id": 1337,
 * //   "shop_id": 1337,
 * //   "print_provider_id": 9,
 * //   "print_areas": [],
 * // }
 */
const updateOne = (productId: string, data: UpdateProductData) =>
  requestPrintify(
    UpdateProductResponse,
    `/v1/shops/{shopId}/products/${productId}.json`,
    {
      method: "PUT",
      data,
    }
  );

export default updateOne;
