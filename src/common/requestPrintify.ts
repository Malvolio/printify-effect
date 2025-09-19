import { HttpBody, HttpClient, HttpClientRequest } from "@effect/platform";

import { Console, Effect, Option, pipe, Schema } from "effect";
import { PrintifyConfig } from "./config";
import {
  ErrorResponseSchema,
  MainErrorResponseSchema,
  PrintifyError,
} from "./errors";

// HTTP method type
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request options interface
export interface RequestOptions {
  readonly method: HttpMethod;
  readonly data?: unknown;
}

const getClientRequest = (method: HttpMethod, fullUrl: string) => {
  // Set the HTTP method
  switch (method) {
    case "GET":
      return HttpClientRequest.get(fullUrl);
    case "POST":
      return HttpClientRequest.post(fullUrl);
    case "PUT":
      return HttpClientRequest.put(fullUrl);
    case "DELETE":
      return HttpClientRequest.del(fullUrl);
    case "PATCH":
      return HttpClientRequest.patch(fullUrl);
  }
};
const addJsonBody = (method: HttpMethod, data?: unknown) =>
  Effect.fn(function* (request: HttpClientRequest.HttpClientRequest) {
    if (!data || method === "GET" || method === "DELETE") {
      return request;
    }
    // Add JSON body for POST/PUT/PATCH requests
    const jsonBody = yield* HttpBody.json(data);
    return HttpClientRequest.setBody(request, jsonBody);
  });

export const requestPrintify = <A, E>(
  sucessSchema: Schema.Schema<A, E>,
  path: string,
  options: RequestOptions
) =>
  Effect.gen(function* () {
    const config = yield* PrintifyConfig;
    const processedUrl = path.replace("{shopId}", config.shopId);

    // Base Printify API URL
    const baseUrl = Option.getOrElse(config.host, () => "https://api.printify.com");
    const fullUrl = `${baseUrl}${processedUrl}`;

    if (config.enableLogging) {
      yield* Console.log(
        `Request:${options.method} ${fullUrl} ${JSON.stringify(
          options.data,
          null,
          2
        )}`
      );
    }
    const request = yield* pipe(
      getClientRequest(options.method, fullUrl),
      HttpClientRequest.setHeader(
        "Authorization",
        `Bearer ${config.accessToken}`
      ),
      HttpClientRequest.setHeader("Content-Type", "application/json"),
      addJsonBody(options.method, options.data)
    );

    const client = yield* HttpClient.HttpClient;
    const schema = Schema.Union(ErrorResponseSchema, sucessSchema);
    return yield* client.execute(request).pipe(
      Effect.andThen((response) => response.json),
      Effect.tap((response) =>
        config.enableLogging
          ? Console.log("Response:", JSON.stringify(response, null, 2))
          : Effect.succeed(undefined)
      ),
      Effect.andThen(Schema.decodeUnknown(schema)),
      Effect.flatMap((result) =>
        Schema.is(sucessSchema)(result)
          ? Effect.succeed(result)
          : Schema.is(MainErrorResponseSchema)(result)
          ? Effect.fail(
              new PrintifyError({ error: result.errors.reason, url: fullUrl })
            )
          : Effect.fail(
              new PrintifyError({
                error: result.error,
                url: fullUrl,
              })
            )
      )
    );
  });
