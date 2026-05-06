/**
 * Mock menu fixture — mirrors the uEngage Edge /v1/menu response shape.
 * Edit item names, prices, and modifiers here to match your real catalogue.
 * Prices are in cents (e.g. 850 = $8.50).
 */

export const mockMenuResponse = {
  store_id: 'store-001',
  categories: [
    {
      id: 'cat-smoothies',
      name: 'Smoothies',
      display_order: 1,
      image_url: null,
      items: [
        {
          id: 'item-001',
          name: 'Tropical Blast',
          description: 'Mango, pineapple, coconut water, and a hint of lime.',
          price: 850,
          image_url: null,
          is_available: true,
          tags: ['bestseller', 'vegan'],
          modifier_groups: [
            {
              id: 'mg-size',
              name: 'Size',
              required: true,
              min_selections: 1,
              max_selections: 1,
              options: [
                { id: 'opt-sm', name: 'Small (12 oz)', price: 0, is_available: true },
                { id: 'opt-md', name: 'Medium (16 oz)', price: 100, is_available: true },
                { id: 'opt-lg', name: 'Large (24 oz)', price: 200, is_available: true },
              ],
            },
            {
              id: 'mg-protein',
              name: 'Protein Add-In',
              required: false,
              min_selections: 0,
              max_selections: 2,
              options: [
                { id: 'opt-whey', name: 'Whey Protein', price: 150, is_available: true },
                { id: 'opt-plant', name: 'Plant Protein', price: 150, is_available: true },
                { id: 'opt-collagen', name: 'Collagen Peptides', price: 200, is_available: true },
              ],
            },
          ],
        },
        {
          id: 'item-002',
          name: 'Berry Recharge',
          description: 'Strawberry, blueberry, banana, and almond milk.',
          price: 800,
          image_url: null,
          is_available: true,
          tags: ['vegan'],
          modifier_groups: [
            {
              id: 'mg-size',
              name: 'Size',
              required: true,
              min_selections: 1,
              max_selections: 1,
              options: [
                { id: 'opt-sm', name: 'Small (12 oz)', price: 0, is_available: true },
                { id: 'opt-md', name: 'Medium (16 oz)', price: 100, is_available: true },
                { id: 'opt-lg', name: 'Large (24 oz)', price: 200, is_available: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-bowls',
      name: 'Acai Bowls',
      display_order: 2,
      image_url: null,
      items: [
        {
          id: 'item-003',
          name: 'Classic Acai Bowl',
          description: 'Acai base, granola, fresh banana, honey drizzle.',
          price: 1200,
          image_url: null,
          is_available: true,
          tags: ['glutenfree'],
          modifier_groups: [
            {
              id: 'mg-toppings',
              name: 'Extra Toppings',
              required: false,
              min_selections: 0,
              max_selections: 4,
              options: [
                { id: 'opt-chia', name: 'Chia Seeds', price: 75, is_available: true },
                { id: 'opt-pb', name: 'Peanut Butter', price: 100, is_available: true },
                { id: 'opt-coco', name: 'Coconut Flakes', price: 50, is_available: true },
                { id: 'opt-cacao', name: 'Cacao Nibs', price: 75, is_available: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-shots',
      name: 'Wellness Shots',
      display_order: 3,
      image_url: null,
      items: [
        {
          id: 'item-004',
          name: 'Ginger Immunity Shot',
          description: 'Fresh ginger, lemon, turmeric, black pepper.',
          price: 350,
          image_url: null,
          is_available: true,
          tags: ['vegan', 'glutenfree'],
          modifier_groups: [],
        },
      ],
    },
  ],
};
