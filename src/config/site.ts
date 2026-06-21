// ============================================================
//  Site configuration — brand, nav fallbacks, footer, value props.
//  Single source of truth (DRY) for non-Shopify content.
// ============================================================

export const SITE = {
  name: 'UrbanVibe',
  tagline: 'Considered everyday apparel, built to move.',
  /** Free-shipping threshold (matches the value in `announcements`). */
  freeShippingThreshold: 150,
  description:
    'Modern everyday apparel — better materials, cleaner cuts, cut for the way you actually live. A headless Shopify storefront built with Astro.',
  // Rotating announcement bar (top ticker).
  announcements: [
    'Free carbon-neutral shipping over $150',
    'Easy 30-day returns',
    'New season — Drop 01 out now',
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  ],
  /** Trust strip on home + PDP. */
  valueProps: [
    {
      icon: 'truck' as const,
      title: 'Free shipping',
      body: 'Carbon-neutral delivery on every order over $150.',
    },
    {
      icon: 'rotate' as const,
      title: 'Easy 30-day returns',
      body: 'Changed your mind? Send it back within 30 days, no fuss.',
    },
    {
      icon: 'shield' as const,
      title: 'Made to last',
      body: 'Premium materials and honest construction, built for the long haul.',
    },
  ],
  /** Footer link columns (handles resolve to /pages/* or external). */
  footerColumns: [
    {
      title: 'Shop',
      links: [
        { label: 'All products', href: '/products' },
        { label: 'Collections', href: '/collections' },
        { label: 'New arrivals', href: '/products?sort=newest' },
        { label: 'On sale', href: '/collections/on-sale' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Shipping', href: '/pages/shipping' },
        { label: 'Returns', href: '/pages/returns' },
        { label: 'Size guide', href: '/pages/size-guide' },
        { label: 'Contact', href: '/pages/contact' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Our story', href: '/pages/about' },
        { label: 'Sustainability', href: '/pages/sustainability' },
        { label: 'Journal', href: '/pages/journal' },
        { label: 'Stockists', href: '/pages/stockists' },
      ],
    },
  ],
} as const;

/** Header nav used when the Shopify "main-menu" is unavailable. */
export const FALLBACK_NAV = [
  { title: 'Shop', url: '/products' },
  { title: 'Collections', url: '/collections' },
  { title: 'Journal', url: '/pages/journal' },
];
