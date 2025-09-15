import { FetchHttpClient } from "@effect/platform";
import { BunContext } from "@effect/platform-bun";
import { ConfigProvider, Console, Effect, Layer, pipe } from "effect";
import printify, { PrintifyConfigLayer } from "../src";

const program = Effect.gen(function* () {
  const newUpload = {
    file_name: "test-upload.png",
    contents: `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII`,
  };
  const createdUpload = yield* printify.uploads.uploadImage(newUpload);
  yield* Console.log("Created upload:", createdUpload);
});

await pipe(
  program,
  Effect.provide(Layer.setConfigProvider(ConfigProvider.fromEnv())),
  Effect.provide(BunContext.layer),
  Effect.provide(PrintifyConfigLayer),
  Effect.provide(FetchHttpClient.layer),
  Effect.scoped,
  Effect.runPromise
);
