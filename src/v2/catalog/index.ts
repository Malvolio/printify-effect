import getEconomyShippingInfo from "./getEconomyShippingInfo";
import getExpressShippingInfo from "./getExpressShippingInfo";
import getPriorityShippingInfo from "./getPriorityShippingInfo";
import getShippingListInfo from "./getShippingListInfo";
import getStandardShippingInfo from "./getStandardShippingInfo";

const CatalogV2 = {
  getShippingListInfo,
  getStandardShippingInfo,
  getPriorityShippingInfo,
  getExpressShippingInfo,
  getEconomyShippingInfo,
};

export default CatalogV2;
