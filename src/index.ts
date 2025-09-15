import orders from "./v1/orders";
import products from "./v1/products";
import shops from "./v1/shops";
import uploads from "./v1/uploads";
import webhooks from "./v1/webhooks";
import catalog from "./v2/catalog";
export { PrintifyConfig, PrintifyConfigLayer } from "./common/config";
export { PrintifyError } from "./common/errors";
export * from "./v1/brands";
export default {
  products,
  uploads,
  shops,
  orders,
  webhooks,
  catalog,
};
