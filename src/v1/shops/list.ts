import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ListShopsResponse } from "../schemas";

export type ListShopsResponseType = Schema.Schema.Type<
  typeof ListShopsResponse
>;

/**
 * Retrieve a list of shops in a Printify account
 *
 * @returns Effect that yields an array of shops
 *
 * @example
 * const shopsEffect = printify.shops.list();
 * // Expected response:
 * // [
 * //   { id: 5432, title: "My new store", sales_channel: "My Sales Channel" },
 * //   { id: 9876, title: "My other new store", sales_channel: "disconnected" }
 * // ]
 */
const list = () =>
  requestPrintify(ListShopsResponse, `/v1/shops.json`, { method: "GET" });

export default list;
