import { ImageId, ProductId } from "./brands";
// Orders
export interface Address {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  company?: string;
}

export interface OrderShipment {
  carrier: string;
  number: string;
  url: string;
  delivered_at: string;
}

export interface PrintifyConnection {
  id: string;
  url: string;
}

export interface LineItem {
  product_id: ProductId;
  quantity: number;
  variant_id: number;
  print_provider_id: number;
  cost: number;
  shipping_cost: number;
  status: string;
  metadata: {
    title: string;
    price: number;
    variant_label: string;
    sku: string;
    country: string;
  };
  sent_to_production_at?: string;
  fulfilled_at?: string;
}

export interface ShippingLineItem {
  product_id?: ProductId;
  variant_id?: number;
  quantity: number;
  print_provider_id?: number;
  blueprint_id?: number;
  sku?: string;
}

export interface NewLineItem {
  product_id?: ProductId;
  print_provider_id?: number;
  blueprint_id?: number;
  variant_id?: number;
  print_areas?: {
    front?:
      | string
      | { src: string; scale: number; x: number; y: number; angle: number }[];
    back?:
      | string
      | { src: string; scale: number; x: number; y: number; angle: number }[];
  };
  print_details?: {
    print_on_side?: string;
  };
  sku?: string;
  quantity: number;
}

export interface ExpressLineItem {
  product_id: ProductId;
  variant_id: number;
  quantity: number;
}

export interface Order {
  id: string;
  address_to: Address;
  line_items: LineItem[];
  metadata: {
    order_type: string;
    shop_order_id: number;
    shop_order_label: string;
    shop_fulfilled_at: string;
  };
  total_price: number;
  total_shipping: number;
  total_tax: number;
  status: string;
  shipping_method: number;
  is_printify_express: boolean;
  is_economy_shipping: boolean;
  shipments: OrderShipment[];
  created_at: string;
  sent_to_production_at: string;
  fulfilled_at: string;
  printify_connect: PrintifyConnection;
}

export interface CalculateShippingData {
  line_items: ShippingLineItem[];
  address_to: Address;
}

export interface NewProduct {
  title: string;
  description: string;
  blueprint_id: number;
  print_provider_id: number;
  variants: Array<{
    id: number;
    price: number;
    is_enabled: boolean;
  }>;
  print_areas: PrintArea[];
}

export interface UpdateProductData {
  title?: string;
  description?: string;
  images?: string[];
  variants?: any[];
  tags?: string[];
  keyFeatures?: string[];
  shipping_template?: string;
}

export interface PrintArea {
  variant_ids: number[];
  placeholders: {
    position: string;
    images: {
      id: ImageId;
      x: number;
      y: number;
      scale: number;
      angle: number;
    }[];
  }[];
}

export interface ExternalProductData {
  id: string;
  handle: string;
}

// Shops - removed duplicative Shop interface, now using schema

// Uploads - removed duplicative ImageUpload interface, now using schema

// Webhooks - removed duplicative Webhook interface, now using schema

export interface NewWebhook {
  topic: string;
  url: string;
  secret?: string;
}
