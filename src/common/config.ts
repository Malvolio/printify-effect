import { Config, Context, Duration, Effect, Layer, Option } from "effect";

export interface PrintifyConfig {
  readonly shopId: string;
  readonly accessToken: string;
  readonly timeout?: Duration.Duration;
  readonly host: Option.Option<string>;
  readonly enableLogging?: boolean;
}

export const PrintifyConfig = Context.GenericTag<PrintifyConfig>(
  "@printify/PrintifyConfig"
);
// Create a Effect that provides PrintifyConfig from Config layer
export const PrintifyConfigDefault = Effect.gen(function* () {
  const accessToken = yield* Config.string("PRINTIFY_API_KEY");
  const shopId = yield* Config.string("PRINTIFY_SHOP_ID");
  const timeoutS = yield* Config.string("PRINTIFY_TIMEOUT_ISO").pipe(
    Config.withDefault("PT15S")
  );

  const timeout = yield* Duration.fromIso(timeoutS).pipe(
    Option.match({
      onNone: () => Effect.fail(new Error("Invalid PRINTIFY_TIMEOUT_ISO")),
      onSome: (d) => Effect.succeed(d),
    })
  );

  const host = yield* Config.option(Config.string("PRINTIFY_HOST"));
  const enableLogging = yield* Config.boolean("PRINTIFY_ENABLE_LOGGING").pipe(
    Config.withDefault(false)
  );

  return {
    shopId,
    accessToken,
    timeout,
    host,
    enableLogging,
  };
});

// Create a Effect that provides PrintifyConfig from Config layer
export const PrintifyConfigLayer = Layer.effect(
  PrintifyConfig,
  PrintifyConfigDefault
);
