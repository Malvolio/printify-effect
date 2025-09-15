import { Effect } from "effect";
import { expect, test } from "vitest";
import printify from "../src";
import { makeNewProduct, makeNewUpload, runPrintifyTest } from "./utils";

test("products.create", async () => {
  const program = Effect.gen(function* () {
    const newUpload = makeNewUpload();
    const { id: imageId } = yield* printify.uploads.uploadImage(newUpload);

    const newProduct = makeNewProduct(imageId);
    const createdProduct = yield* printify.products.create(newProduct);
    const createdProductDetails = yield* printify.products.getOne(
      createdProduct.id
    );
    expect(createdProductDetails.id).toBe(createdProduct.id);
    expect(createdProductDetails.title).toBe(newProduct.title);
    expect(createdProductDetails.description).toBe(newProduct.description);
    expect(createdProductDetails.variants.length).toBe(
      newProduct.variants.length
    );
    expect(createdProductDetails.print_areas.length).toBe(
      newProduct.print_areas.length
    );

    yield* printify.products.deleteOne(createdProduct.id);
  });
  await runPrintifyTest(program);
});

test("products.list", async () => {
  await runPrintifyTest(printify.products.list());
});
