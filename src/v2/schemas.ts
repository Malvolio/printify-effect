import { Schema } from "effect";
import {
  CurrencyCode,
  MoneyAmount,
  NonEmptyString,
  NonnegativeInteger,
} from "../common/schemas";

// V2 Catalog shipping schemas
export const ShippingInfo = Schema.Struct({
  type: NonEmptyString,
  id: NonEmptyString,
  attributes: Schema.Struct({
    name: NonEmptyString,
  }),
});

export const ShippingInfoSpecific = Schema.Struct({
  type: NonEmptyString,
  id: NonEmptyString,
  attributes: Schema.Struct({
    shippingType: NonEmptyString,
    country: Schema.Struct({
      code: NonEmptyString,
    }),
    variantId: NonnegativeInteger,
    shippingPlanId: NonEmptyString,
    handlingTime: Schema.Struct({
      from: NonnegativeInteger,
      to: NonnegativeInteger,
    }),
    shippingCost: Schema.Struct({
      firstItem: Schema.Struct({
        amount: MoneyAmount,
        currency: CurrencyCode,
      }),
      additionalItems: Schema.Struct({
        amount: MoneyAmount,
        currency: CurrencyCode,
      }),
    }),
  }),
});

// V2 Response types
export const GetShippingListInfoResponse = Schema.Array(ShippingInfo);
export const GetStandardShippingInfoResponse = ShippingInfoSpecific;
export const GetPriorityShippingInfoResponse = ShippingInfoSpecific;
export const GetExpressShippingInfoResponse = ShippingInfoSpecific;
export const GetEconomyShippingInfoResponse = ShippingInfoSpecific;
