import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { CalculateShippingResponse } from "../schemas";
import { CalculateShippingData } from "../types";

export type CalculateShippingResponseType = Schema.Schema.Type<
  typeof CalculateShippingResponse
>;

/**
 * Calculate the shipping cost of an order
 *
 * @param {CalculateShippingData} data - The data required to calculate shipping
 * @returns Effect that yields the shipping calculation response
 *
 * @example
 * const data = {
 *   line_items: [
 *     { product_id: '5bfd0b66a342bcc9b5563216', variant_id: 17887, quantity: 1 },
 *     { print_provider_id: 5, blueprint_id: 9, variant_id: 17887, quantity: 1 },
 *     { sku: 'MY-SKU', quantity: 1 },
 *   ],
 *   address_to: {
 *     first_name: 'John',
 *     last_name: 'Smith',
 *     email: 'example@msn.com',
 *     phone: '0574 69 21 90',
 *     country: 'BE',
 *     region: '',
 *     address1: 'ExampleBaan 121',
 *     address2: '45',
 *     city: 'Retie',
 *     zip: '2470',
 *   },
 * };
 * const shippingCosts = printify.orders.calculateShipping(data);
 * // Expected response: { standard: 1000, express: 5000, priority: 5000, printify_express: 799, economy: 399 }
 */
const calculateShipping = (data: CalculateShippingData) => {
  return requestPrintify(
    CalculateShippingResponse,
    `/v1/shops/{shopId}/orders/shipping.json`,
    {
      method: "POST",
      data,
    }
  );
};

export default calculateShipping;
