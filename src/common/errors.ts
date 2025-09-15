import { Schema } from "effect";
import { TaggedError } from "effect/Data";

export const ErrorsSchema = Schema.Struct({
  reason: Schema.String,
  code: Schema.Number,
});

export const MainErrorResponseSchema = Schema.Struct({
  status: Schema.Literal("error"),
  code: Schema.Number,
  message: Schema.String,
  errors: ErrorsSchema,
});

export const AlternativeErrorResponseSchema = Schema.Struct({
  error: Schema.String,
});

export const ErrorResponseSchema = Schema.Union(
  MainErrorResponseSchema,
  AlternativeErrorResponseSchema
);
export class PrintifyError extends TaggedError("PrintifyError")<{
  error: string;
  url: string;
}> {}
