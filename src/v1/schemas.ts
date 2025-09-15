import { pipe, Schema } from "effect";
import {
  CurrencyCode,
  EmailString,
  MoneyAmount,
  NonEmptyString,
  NonnegativeInteger,
  NonnegativeNumber,
  PrintifyDateString,
  UrlString,
} from "../common/schemas";
import { ImageIdSchema, ProductIdSchema, WebhookIdSchema } from "./brands";

export const Shop = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  sales_channel: NonEmptyString,
});

export const ListShopsResponse = Schema.Array(Shop);

// Address schema
export const Address = Schema.Struct({
  first_name: NonEmptyString,
  last_name: NonEmptyString,
  email: Schema.optional(Schema.NullOr(EmailString)),
  phone: NonEmptyString,
  country: Schema.optional(Schema.NullOr(Schema.String)),
  region: Schema.String,
  address1: NonEmptyString,
  address2: Schema.optional(Schema.String),
  city: NonEmptyString,
  zip: NonEmptyString,
  company: Schema.optional(Schema.NullOr(Schema.String)),
});

// Order schemas
export const OrderShipment = Schema.Struct({
  carrier: NonEmptyString,
  number: NonEmptyString,
  url: UrlString,
  delivered_at: PrintifyDateString,
});

export const PrintifyConnection = Schema.Struct({
  id: NonEmptyString,
  url: UrlString,
});

export const LineItemMetadata = Schema.Struct({
  title: NonEmptyString,
  price: MoneyAmount,
  variant_label: NonEmptyString,
  sku: NonEmptyString,
  country: NonEmptyString,
});

export const LineItem = Schema.Struct({
  product_id: NonEmptyString,
  quantity: NonnegativeInteger,
  variant_id: NonnegativeInteger,
  print_provider_id: NonnegativeInteger,
  cost: MoneyAmount,
  shipping_cost: MoneyAmount,
  status: NonEmptyString,
  metadata: LineItemMetadata,
  sent_to_production_at: Schema.optional(PrintifyDateString),
  fulfilled_at: Schema.optional(PrintifyDateString),
});

export const OrderMetadata = Schema.Struct({
  order_type: NonEmptyString,
  shop_order_id: NonEmptyString,
  shop_order_label: Schema.String,
  shop_fulfilled_at: Schema.optional(PrintifyDateString),
});

export const Order = Schema.Struct({
  id: NonEmptyString,
  address_to: Address,
  line_items: Schema.Array(LineItem),
  external: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: NonEmptyString,
        handle: NonEmptyString,
        shipping_template_id: NonEmptyString,
      })
    )
  ),
  metadata: OrderMetadata,
  total_price: MoneyAmount,
  total_shipping: MoneyAmount,
  total_tax: MoneyAmount,
  status: NonEmptyString,
  shipping_method: NonnegativeInteger,
  is_printify_express: Schema.optional(Schema.Boolean),
  is_economy_shipping: Schema.optional(Schema.Boolean),
  shipments: Schema.optional(Schema.Array(OrderShipment)),
  created_at: PrintifyDateString,
  sent_to_production_at: Schema.optional(PrintifyDateString),
  fulfilled_at: Schema.optional(PrintifyDateString),
  printify_connect: PrintifyConnection,
});

export const ListOrdersResponse = Schema.Struct({
  current_page: NonnegativeInteger,
  data: Schema.Array(Order),
});

export const GetOrderResponse = Order;

export const SubmitOrderResponse = Schema.Struct({
  id: NonEmptyString,
});

export const SubmitExpressOrderResponse = Schema.Struct({
  ordinary: Schema.optional(
    Schema.Struct({
      id: NonEmptyString,
    })
  ),
  express: Schema.optional(
    Schema.Struct({
      id: NonEmptyString,
    })
  ),
});

export const SendOrderToProductionResponse = Order;

export const CalculateShippingResponse = Schema.Struct({
  standard: MoneyAmount,
  express: MoneyAmount,
  priority: MoneyAmount,
  printify_express: MoneyAmount,
  economy: MoneyAmount,
});

export const CancelUnpaidOrderResponse = Order;

// Product schemas
export const ProductOption = Schema.Struct({
  name: NonEmptyString,
  type: NonEmptyString,
  values: Schema.Array(
    Schema.Struct({
      id: NonnegativeInteger,
      title: NonEmptyString,
    })
  ),
});

export const ProductVariant = Schema.Struct({
  id: NonnegativeInteger,
  sku: NonEmptyString,
  cost: MoneyAmount,
  price: MoneyAmount,
  title: NonEmptyString,
  grams: NonnegativeNumber,
  is_enabled: Schema.Boolean,
  is_default: Schema.Boolean,
  is_available: Schema.Boolean,
  is_printify_express_eligible: Schema.Boolean,
  options: Schema.Array(NonnegativeInteger),
});

export const ProductImage = Schema.Struct({
  src: UrlString,
  variant_ids: Schema.Array(NonnegativeInteger),
  position: NonEmptyString,
  is_default: Schema.Boolean,
});

export const PlaceholderImage = Schema.Struct({
  id: NonEmptyString,
  name: NonEmptyString,
  type: NonEmptyString,
  height: NonnegativeNumber,
  width: NonnegativeNumber,
  x: Schema.Number,
  y: Schema.Number,
  scale: NonnegativeNumber,
  angle: Schema.Number,
});

export const PrintAreaPlaceholder = Schema.Struct({
  position: NonEmptyString,
  images: Schema.Array(PlaceholderImage),
});

export const PrintArea = Schema.Struct({
  variant_ids: Schema.Array(NonnegativeInteger),
  placeholders: Schema.Array(PrintAreaPlaceholder),
  background: Schema.String,
});

export const ExternalProductData = Schema.Struct({
  id: NonEmptyString,
  handle: NonEmptyString,
});

const PrintDetails = Schema.Struct({
  print_on_side: Schema.optional(Schema.Literal("regular", "mirror", "off")),
});
export const Product = Schema.Struct({
  id: ProductIdSchema,
  title: NonEmptyString,
  description: NonEmptyString,
  safety_information: Schema.optional(NonEmptyString),
  tags: Schema.optional(Schema.Array(NonEmptyString)),
  options: Schema.optional(Schema.Array(ProductOption)),
  variants: Schema.Array(ProductVariant),
  images: Schema.Array(ProductImage),
  created_at: PrintifyDateString,
  updated_at: PrintifyDateString,
  visible: Schema.optional(Schema.Boolean),
  blueprint_id: NonnegativeInteger,
  print_provider_id: NonnegativeInteger,
  user_id: NonnegativeInteger,
  shop_id: NonnegativeInteger,
  print_areas: Schema.Array(PrintArea),
  print_details: Schema.optional(
    Schema.Union(PrintDetails, Schema.Array(PrintDetails))
  ),
  external: Schema.optional(Schema.Array(ExternalProductData)),
  is_locked: Schema.optional(Schema.Boolean),
  is_printify_express_eligible: Schema.optional(Schema.Boolean),
  is_printify_express_enabled: Schema.optional(Schema.Boolean),
  is_economy_shipping_eligible: Schema.optional(Schema.Boolean),
  is_economy_shipping_enabled: Schema.optional(Schema.Boolean),
  sales_channel_properties: Schema.optional(
    Schema.Union(
      Schema.Record({ key: Schema.String, value: Schema.Unknown }),
      Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
    )
  ),
  views: Schema.optional(
    Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
  ),
});

export const ListProductsResponse = Schema.Struct({
  current_page: NonnegativeInteger,
  data: Schema.Array(Product),
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

export const GetProductResponse = Product;
export const CreateProductResponse = Product;
export const UpdateProductResponse = Product;

// Catalog schemas
export const Location = Schema.Struct({
  address1: NonEmptyString,
  address2: Schema.NullOr(NonEmptyString),
  city: NonEmptyString,
  country: NonEmptyString,
  region: NonEmptyString,
  zip: NonEmptyString,
});

export const PrintProvider = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  location: Schema.optional(Location),
});

export const Placeholder = Schema.Struct({
  position: NonEmptyString,
  height: NonnegativeInteger,
  width: NonnegativeInteger,
});

export const Variant = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  options: Schema.Struct({
    color: Schema.String,
    size: Schema.String,
  }),
  placeholders: Schema.Array(Placeholder),
});

export const Blueprint = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  description: Schema.optional(NonEmptyString),
  brand: NonEmptyString,
  model: NonEmptyString,
  images: Schema.Array(UrlString),
});

export const ListBlueprintsResponse = Schema.Array(Blueprint);
export const ListProvidersResponse = Schema.Array(PrintProvider);
export const GetBlueprintResponse = Blueprint;
export const GetBlueprintVariantsResponse = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  variants: Schema.Array(Variant),
});
export const GetProviderResponse = Schema.Struct({
  id: NonnegativeInteger,
  title: NonEmptyString,
  location: Location,
  blueprints: Schema.Array(Blueprint),
});
export const GetBlueprintProviderResponse = Schema.Array(PrintProvider);

export const ShippingProfile = Schema.Struct({
  variant_ids: Schema.Array(NonnegativeInteger),
  first_item: Schema.Struct({
    cost: MoneyAmount,
    currency: CurrencyCode,
  }),
  additional_items: Schema.Struct({
    cost: MoneyAmount,
    currency: CurrencyCode,
  }),
  countries: Schema.Array(NonEmptyString),
});

export const GetVariantShippingResponse = Schema.Struct({
  handling_time: Schema.Struct({
    value: NonnegativeInteger,
    unit: Schema.Literal("day", "business_day"),
  }),
  profiles: Schema.Array(ShippingProfile),
});

// Upload schemas
export const ImageUpload = Schema.Struct({
  file_name: NonEmptyString,
  height: NonnegativeInteger,
  width: NonnegativeInteger,
  size: NonnegativeInteger,
  mime_type: NonEmptyString,
  preview_url: UrlString,
  upload_time: PrintifyDateString,
});

export const Image = Schema.extend(
  ImageUpload,
  Schema.Struct({
    id: ImageIdSchema,
  })
);

export const ListUploadsResponse = Schema.Struct({
  current_page: NonnegativeInteger,
  data: Schema.Array(ImageUpload),
  first_page_url: Schema.String,
  from: Schema.NullOr(NonnegativeInteger),
  last_page: NonnegativeInteger,
  last_page_url: Schema.String,
  next_page_url: Schema.NullOr(Schema.String),
  path: Schema.String,
  per_page: NonnegativeInteger,
  prev_page_url: Schema.NullOr(Schema.String),
  to: Schema.NullOr(NonnegativeInteger),
  total: NonnegativeInteger,
});

export const UploadImageResponse = Image;
export const GetUploadByIdResponse = Image;

// Webhook schemas
export const Webhook = Schema.Struct({
  id: WebhookIdSchema,
  topic: NonEmptyString,
  url: UrlString,
  shop_id: NonEmptyString,
});

export const ListWebhooksResponse = Schema.Array(Webhook);

export const CreateWebhookResponse = Schema.Struct({
  topic: NonEmptyString,
  url: UrlString,
  shop_id: NonEmptyString,
  id: NonEmptyString,
});

export const UpdateWebhookResponse = Schema.Struct({
  topic: NonEmptyString,
  url: UrlString,
  shop_id: NonEmptyString,
  id: NonEmptyString,
});

export const DeleteWebhookResponse = Schema.Struct({
  message: NonEmptyString,
});

// Empty response schema for operations that return empty objects/void
export const EmptyResponse = Schema.Struct({});

const HasId = Schema.Struct({ id: Schema.String });
type HasId = typeof HasId.Type;
export const withId = <A extends HasId, I extends HasId, R>(
  originalSchema: Schema.Schema<A, I, R>,
  id: string
) =>
  pipe(
    originalSchema,
    Schema.omit("id"),
    Schema.extend(
      Schema.Struct({
        id: Schema.optional(Schema.String).pipe(
          Schema.withDecodingDefault(() => id)
        ),
      })
    )
  );
