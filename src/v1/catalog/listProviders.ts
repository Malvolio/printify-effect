import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListProvidersResponse } from "../schemas";

export { ListProvidersResponse };
export type ListProvidersResponseType = Schema.Schema.Type<
  typeof ListProvidersResponse
>;

/**
 * Retrieve a list of all available print-providers
 *
 * @returns Effect that yields the list of providers
 *
 * @example
 * const providers = printify.catalog.listProviders();
 * // Expected response: [
 * //   {
 * //     id: 1,
 * //     title: "SPOKE Custom Products",
 * //     location: {
 * //       address1: "89 Weirfield St",
 * //       address2: null,
 * //       city: "Brooklyn",
 * //       country: "US",
 * //       region: "NY",
 * //       zip: "11221-5120"
 * //     }
 * //   },
 * //   {
 * //     id: 2,
 * //     title: "CG Pro prints",
 * //     location: {
 * //       address1: "89 Weirfield St",
 * //       address2: null,
 * //       city: "Brooklyn",
 * //       country: "US",
 * //       region: "NY",
 * //       zip: "11221-5120"
 * //     }
 * //   },
 * //   // ...
 * // ]
 */
const listProviders = () =>
  requestPrintify(ListProvidersResponse, "/v1/catalog/print_providers.json", {
    method: "GET",
  });

export default listProviders;
