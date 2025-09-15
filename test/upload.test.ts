import { Effect } from "effect";
import { expect, test } from "vitest";
import printify from "../src";
import { makeNewUpload, runPrintifyTest } from "./utils";

test("uploads.list", async () => {
  const program = Effect.gen(function* () {
    const newUpload = makeNewUpload();
    const createdUpload = yield* printify.uploads.uploadImage(newUpload);
    const createdUploadDetails = yield* printify.uploads.getById(
      createdUpload.id
    );
    expect(createdUploadDetails.id).toBe(createdUpload.id);
    expect(createdUploadDetails.file_name).toBe(newUpload.file_name);
    yield* printify.uploads.archive(createdUpload.id);
  });
  await runPrintifyTest(program);
});
