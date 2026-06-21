// ============================================================
//  Shopify Storefront API — flattened domain types (2026-04)
// ============================================================
// These describe the *clean* shapes our transforms produce, not
// the raw edges/node GraphQL envelopes.

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice?: Money | null;
  image?: Image | null;
}

export interface ProductOptionValue {
  id: string;
  name: string;
}

export interface ProductOption {
  id: string;
  name: string;
  optionValues: ProductOptionValue[];
}

export interface Seo {
  title?: string | null;
  description?: string | null;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  availableForSale: boolean;
  featuredImage?: Image | null;
  images: Image[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
  options: ProductOption[];
  variants: ProductVariant[];
  seo?: Seo;
}

/** Lightweight product shape used in grids/cards. */
export interface ProductCard {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  availableForSale: boolean;
  featuredImage?: Image | null;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

/** A flattened paginated list. */
export interface Paginated<T> {
  items: T[];
  pageInfo: PageInfo;
}

export interface CollectionFilterValue {
  id: string;
  label: string;
  count: number;
  input: string;
}

export interface CollectionFilter {
  id: string;
  label: string;
  type: string;
  values: CollectionFilterValue[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  image?: Image | null;
  seo?: Seo;
}

export interface CollectionWithProducts extends Collection {
  products: Paginated<ProductCard>;
  filters?: CollectionFilter[];
}

// ── Cart ────────────────────────────────────────────────────

export interface CartLineMerchandise {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  image?: Image | null;
  product: {
    id: string;
    title: string;
    handle: string;
    featuredImage?: Image | null;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
    amountPerQuantity: Money;
  };
  merchandise: CartLineMerchandise;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  note?: string | null;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
}

// ── Navigation / content ────────────────────────────────────

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  type: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface Shop {
  name: string;
  description?: string;
  primaryDomain: { url: string; host: string };
}

// ── Sort options surfaced in the UI ─────────────────────────

export interface SortOption {
  label: string;
  value: string;
  sortKey: string;
  reverse: boolean;
}
