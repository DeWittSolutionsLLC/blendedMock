/**
 * JSON-LD Schema Generators
 *
 * Produces structured data objects conforming to Schema.org specifications.
 * Inject these via react-helmet-async <script type="application/ld+json">.
 *
 * Two schemas covered:
 *   buildRestaurantSchema  — Schema.org/Restaurant (used on Home / About / Location pages)
 *   buildMenuSchema        — Schema.org/Menu + MenuSection + MenuItem (used on /menu page)
 *
 * Why generators instead of static JSON?
 *   Data is dynamic (multi-location, live menu) so schemas must reflect the
 *   currently-selected store and the live fetched catalogue.
 */

/**
 * @typedef {object} StoreDetails
 * @property {string} name
 * @property {string} url               — canonical URL for this location's page
 * @property {string} [logo]            — absolute image URL
 * @property {string} [telephone]
 * @property {string} [priceRange]      — e.g. "$" | "$$"
 * @property {{ streetAddress, addressLocality, addressRegion, postalCode, addressCountry }} [address]
 * @property {{ latitude: number, longitude: number }} [geo]
 * @property {string[]} [servesCuisine]
 * @property {{ opens: string, closes: string, dayOfWeek: string[] }[]} [openingHours]
 */

/**
 * Build a Schema.org/Restaurant JSON-LD object.
 * @param {StoreDetails} store
 * @returns {object}
 */
export function buildRestaurantSchema(store) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: store.name,
    url: store.url,
  };

  if (store.logo) schema.logo = store.logo;
  if (store.telephone) schema.telephone = store.telephone;
  if (store.priceRange) schema.priceRange = store.priceRange;
  if (store.servesCuisine) schema.servesCuisine = store.servesCuisine;

  if (store.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...store.address,
    };
  }

  if (store.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: store.geo.latitude,
      longitude: store.geo.longitude,
    };
  }

  if (store.openingHours?.length) {
    schema.openingHoursSpecification = store.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      opens: slot.opens,
      closes: slot.closes,
      dayOfWeek: slot.dayOfWeek,
    }));
  }

  return schema;
}

/**
 * Build a Schema.org/Menu JSON-LD object from flattened menu data.
 *
 * @param {{
 *   restaurantName: string,
 *   restaurantUrl: string,
 *   categories: import('../hooks/useMenu').FlatCategory[],
 *   categorisedItems: Record<string, import('../hooks/useMenu').FlatItem[]>,
 * }} params
 * @returns {object}
 */
export function buildMenuSchema({ restaurantName, restaurantUrl, categories, categorisedItems }) {
  const menuSections = categories.map((cat) => {
    const items = (categorisedItems[cat.id] ?? []).map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.description || undefined,
      offers: {
        '@type': 'Offer',
        price: (item.price / 100).toFixed(2), // assumes price stored in cents
        priceCurrency: 'USD',
        availability: item.isAvailable
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
      ...(item.imageUrl ? { image: item.imageUrl } : {}),
    }));

    return {
      '@type': 'MenuSection',
      name: cat.name,
      hasMenuItem: items,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${restaurantName} Menu`,
    mainEntityOfPage: restaurantUrl,
    hasMenuSection: menuSections,
  };
}
