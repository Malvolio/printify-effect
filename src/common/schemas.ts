import { Schema } from "effect";

// Base schema types
export const NonnegativeNumber = Schema.Number.pipe(
  Schema.greaterThanOrEqualTo(0)
);
export const NonnegativeInteger = Schema.Int.pipe(
  Schema.greaterThanOrEqualTo(0)
);
export const NonEmptyString = Schema.String.pipe(Schema.minLength(1));
export const UrlString = Schema.String.pipe(Schema.pattern(/^https?:\/\/.+/));
export const EmailString = Schema.String.pipe(
  Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
);
export const PrintifyDateString = Schema.String.pipe(
  Schema.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\+\d{2}:\d{2})?$/)
);
export const MongoId = Schema.String.pipe(Schema.pattern(/^[0-9a-fA-F]{24}$/));

// Pagination schemas
export const PaginationMeta = Schema.Struct({
  current_page: NonnegativeInteger,
  first_page_url: Schema.String,
  from: NonnegativeInteger,
  last_page: NonnegativeInteger,
  last_page_url: Schema.String,
  next_page_url: Schema.NullOr(Schema.String),
  path: Schema.String,
  per_page: NonnegativeInteger,
  prev_page_url: Schema.NullOr(Schema.String),
  to: NonnegativeInteger,
  total: NonnegativeInteger,
});

export const SimplePaginationMeta = Schema.Struct({
  current_page: NonnegativeInteger,
});

// Money values (in cents)
export const MoneyAmount = Schema.Int.pipe(Schema.greaterThanOrEqualTo(0));

// Currency codes
export const CurrencyCode = Schema.String.pipe(Schema.pattern(/^[A-Z]{3}$/));
