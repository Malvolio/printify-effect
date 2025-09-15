import { Schema } from "effect";

export const ImageIdSchema = Schema.String.pipe(
  Schema.brand("printify-effect@ImageId")
);
export type ImageId = typeof ImageIdSchema.Type;
export const ProductIdSchema = Schema.String.pipe(
  Schema.brand("printify-effect@ProductId")
);
export type ProductId = typeof ProductIdSchema.Type;
export const OrderIdSchema = Schema.String.pipe(
  Schema.brand("printify-effect@OrderId")
);
export type OrderId = typeof OrderIdSchema.Type;
export const ShopIdSchema = Schema.String.pipe(
  Schema.brand("printify-effect@ShopId")
);
export type ShopId = typeof ShopIdSchema.Type;

export const WebhookIdSchema = Schema.String.pipe(Schema.brand("WebhookId"));
export type WebhookId = typeof WebhookIdSchema.Type;
