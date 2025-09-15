# Printify Effect

A modern TypeScript library that wraps the Printify REST API using Effect-ts patterns. This library provides a type-safe, functional interface for interacting with Printify's print-on-demand services.

## Status

This is definitely alpha. The image, product, and order APIs have been tested... moderately. The other APIs are raw, and it is entirely possible that some of schemas are wrongly interpreted.

The good thing is, because of the way Effect works, if the libraray fails, it will almost certainly be a ParseError, and therefore easy to track down.

## Features

- **Effect-ts Integration**: Built with Effect-ts for robust error handling, dependency injection, and functional programming patterns
- **Type Safety**: Full TypeScript support with schema validation using effect/schema
- **Modern ESM**: Published as ES modules for cutting-edge JavaScript environments
- **Cross-Platform**: Compatible with npm, pnpm, yarn, and bun
- **Comprehensive API Coverage**: Wraps all major Printify API endpoints

## Installation

```bash
# npm
npm install printify-effect

# pnpm
pnpm add printify-effect

# yarn
yarn add printify-effect

# bun
bun add printify-effect
```

## Example

```typescript
import { FetchHttpClient } from "@effect/platform";
import { BunContext } from "@effect/platform-bun";
import { Effect, ConfigProvider, Console, Layer, pipe } from "effect";
import printify, { PrintifyConfigLayer } from "printify-effect";

const onePixel = `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII`;

const program = Effect.gen(function* () {
  const newUpload = {
    file_name: "test-upload.png",
    contents: onePixel,
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
```

## Configuration

The provided `PrintifyConfigLayer` assumes the following are in your “config-space” (which as provided in the example, is your environment variables):

- PRINTIFY_API_KEY
- PRINTIFY_SHOP_ID

There are also options values:

- PRINTIFY_TIMEOUT_ISO (for example "PT30S" meaning, “30 seconds”)
- PRINTIFY_HOST (dunno why you would used this, but it was in the package I cribbed all this from)

## Acknowledgement

Thanks are given to [printify-sdk-js](https://github.com/spencerlepine/printify-sdk-js) and its
author, [Spencer Lepine](https://spencerlepine.com/). His data-types where the basis for the schemas in this package.

## Development

### Building

```bash
bun run build
```

### Testing

```bash
bun run test
```

### Documentation

```bash
bun run docs
```

## License

MIT
