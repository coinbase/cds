import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_ITEMS_KEY = '@playground/recent_items';
const MAX_RECENT_ITEMS = 10;

export const useRecentItems = () => {
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load recent items from storage on mount
  useEffect(() => {
    const loadRecentItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(RECENT_ITEMS_KEY);
        if (stored) {
          setRecentItems(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load recent items:', error);
      } finally {
        setLoaded(true);
      }
    };

    loadRecentItems();
  }, []);

  // Save to storage whenever recentItems changes
  useEffect(() => {
    if (!loaded) return;

    const saveRecentItems = async () => {
      try {
        await AsyncStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(recentItems));
      } catch (error) {
        console.error('Failed to save recent items:', error);
      }
    };

    saveRecentItems();
  }, [recentItems, loaded]);

  const addRecentItem = useCallback((item: string) => {
    setRecentItems((prev) => {
      // Remove item if it already exists
      const filtered = prev.filter((i) => i !== item);
      // Add to front, limit to MAX_RECENT_ITEMS
      return [item, ...filtered].slice(0, MAX_RECENT_ITEMS);
    });
  }, []);

  const removeRecentItem = useCallback((item: string) => {
    setRecentItems((prev) => prev.filter((i) => i !== item));
  }, []);

  const clearRecentItems = useCallback(() => {
    setRecentItems([]);
  }, []);

  return {
    recentItems,
    addRecentItem,
    removeRecentItem,
    clearRecentItems,
    loaded,
  };
};
