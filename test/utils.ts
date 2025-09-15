import { FetchHttpClient, type HttpClient } from "@effect/platform";
import { BunContext } from "@effect/platform-bun";
import { HttpBodyError } from "@effect/platform/HttpBody";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { ConfigProvider, Effect, Layer, pipe } from "effect";
import { ParseError } from "effect/ParseResult";
import {
  ImageId,
  PrintifyConfig,
  PrintifyConfigLayer,
  PrintifyError,
  ProductId,
} from "../src";

export const runPrintifyTest = (
  testEffect: Effect.Effect<
    void,
    HttpClientError | HttpBodyError | PrintifyError | ParseError,
    HttpClient.HttpClient | PrintifyConfig
  >
) => {
  try {
    return pipe(
      testEffect,
      Effect.provide(Layer.setConfigProvider(ConfigProvider.fromEnv())),
      Effect.provide(BunContext.layer),
      Effect.provide(PrintifyConfigLayer),
      Effect.provide(FetchHttpClient.layer),
      Effect.scoped,
      Effect.runPromise
    );
  } catch (error) {
    console.error("Error during test execution:", error);
    throw error;
  }
};

export const makeNewOrder = (product_id: ProductId) =>
  ({
    external_id: `order-${product_id}`,
    line_items: [
      {
        product_id,
        variant_id: 99003,
        quantity: 1,
      },
    ],
    is_printify_express: false,
    is_economy_shipping: false,
    shipping_method: 1, // Standard shipping
    send_shipping_notification: false,
    address_to: {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "+123456789",
      country: "US",
      region: "CA",
      address1: "123 Main St",
      city: "San Francisco",
      zip: "94102",
    },
  } as const);

export const makeNewProduct = (imageId: ImageId) => ({
  title: "My Custom T-Shirt",
  description: "A beautiful custom t-shirt",
  blueprint_id: 1308,
  print_provider_id: 104,
  variants: [
    {
      id: 99003,
      price: 2000, // $20.00 in cents
      is_enabled: true,
    },
  ],
  print_areas: [
    {
      variant_ids: [99003],
      placeholders: [
        {
          position: "front",
          images: [
            {
              id: imageId,
              x: 0.5,
              y: 0.5,
              scale: 1,
              angle: 0,
            },
          ],
        },
      ],
    },
  ],
});

export const makeNewUpload = () => ({
  file_name: "test-upload.png",
  contents: `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII`,
});
