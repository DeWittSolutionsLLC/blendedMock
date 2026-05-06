/**
 * useMenu — Menu fetch + flatten hook
 *
 * Fetches the raw uEngage category/item/modifier tree and normalises it
 * into flat lookup maps for O(1) access by UI components:
 *
 *   categories       → ordered array for sidebar/tab rendering
 *   itemsById        → { [itemId]: FlatItem }
 *   modifierGroupsById → { [groupId]: ModifierGroup }
 *   categorisedItems → { [categoryId]: FlatItem[] }  — ready for section render
 *
 * Re-fetches whenever selectedStoreId changes so switching locations always
 * serves fresh data.
 *
 * Raw uEngage shape assumed:
 * {
 *   categories: [{
 *     id, name, display_order, image_url,
 *     items: [{
 *       id, name, description, price, image_url, is_available, tags,
 *       modifier_groups: [{
 *         id, name, required, min_selections, max_selections,
 *         options: [{ id, name, price, is_available }]
 *       }]
 *     }]
 *   }]
 * }
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchMenuByStore } from '../services/menuService';
import { useStoreLocationStore } from '../store/storeLocationStore';

// ---------------------------------------------------------------------------
// Flattening utilities
// ---------------------------------------------------------------------------

function flattenMenu(rawPayload) {
  const categories = [];
  const itemsById = {};
  const modifierGroupsById = {};
  const categorisedItems = {};

  const rawCategories = rawPayload?.categories ?? [];

  for (const cat of rawCategories) {
    categories.push({
      id: cat.id,
      name: cat.name,
      displayOrder: cat.display_order ?? 0,
      imageUrl: cat.image_url ?? null,
    });

    categorisedItems[cat.id] = [];

    for (const rawItem of cat.items ?? []) {
      // Register modifier groups globally so they can be looked up by ID
      const modifierGroups = (rawItem.modifier_groups ?? []).map((group) => {
        modifierGroupsById[group.id] = group;
        return group;
      });

      const flatItem = {
        id: rawItem.id,
        categoryId: cat.id,
        name: rawItem.name,
        description: rawItem.description ?? '',
        price: rawItem.price ?? 0,
        imageUrl: rawItem.image_url ?? null,
        isAvailable: rawItem.is_available ?? true,
        tags: rawItem.tags ?? [],
        modifier_groups: modifierGroups,
      };

      itemsById[rawItem.id] = flatItem;
      categorisedItems[cat.id].push(flatItem);
    }
  }

  // Sort categories by display_order
  categories.sort((a, b) => a.displayOrder - b.displayOrder);

  return { categories, itemsById, modifierGroupsById, categorisedItems };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useMenu() {
  const selectedStoreId = useStoreLocationStore((s) => s.selectedStoreId);

  const [state, setState] = useState({
    categories: [],
    itemsById: {},
    modifierGroupsById: {},
    categorisedItems: {},
    isLoading: false,
    error: null,
  });

  const fetchMenu = useCallback(async () => {
    if (!selectedStoreId) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const raw = await fetchMenuByStore(selectedStoreId);
      const flattened = flattenMenu(raw);
      setState({ ...flattened, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err.message }));
    }
  }, [selectedStoreId]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return { ...state, refetch: fetchMenu };
}
