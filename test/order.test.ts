import { Effect } from "effect";
import { expect, test } from "vitest";
import printify from "../src";
import {
  makeNewOrder,
  makeNewProduct,
  makeNewUpload,
  runPrintifyTest,
} from "./utils";

test("orders.create", async () => {
  const program = Effect.gen(function* () {
    const newUpload = makeNewUpload();
    const { id: imageId } = yield* printify.uploads.uploadImage(newUpload);
    const newProduct = makeNewProduct(imageId);
    const { id: productId } = yield* printify.products.create(newProduct);

    const newOrder = makeNewOrder(productId);
    const createdOrder = yield* printify.orders.submit(newOrder);
    const createdOrderDetails = yield* printify.orders.getOne(createdOrder.id);
    expect(createdOrderDetails.id).toBe(createdOrder.id);
    expect(createdOrderDetails.metadata.shop_order_id).toBe(
      newOrder.external_id
    );
  });
  try {
    await runPrintifyTest(program);
  } catch (error) {
    // console.error("Error during test execution:", error); // until I can figure out how to turn off truncation in Vitest
    throw error;
  }
});

test("orders.list", async () => {
  await runPrintifyTest(printify.orders.list());
});
