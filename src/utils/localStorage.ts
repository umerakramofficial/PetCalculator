import { HistoryItem } from '../types/calculator';

const KEYS = {
  FAVORITES: 'petcalc_favorites',
  HISTORY: 'petcalc_history',
  RECENT: 'petcalc_recent',
  THEME: 'petcalc_theme',
  UNIT_SYSTEM: 'petcalc_unit_system',
};

// Favorites
export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleFavorite = (toolId: string): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(toolId);
  let isFavorite = false;
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(toolId);
    isFavorite = true;
  }
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  return isFavorite;
};

export const isFavorite = (toolId: string): boolean => {
  return getFavorites().includes(toolId);
};

// Calculation History
export const getHistory = (): HistoryItem[] => {
  try {
    const data = localStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
  };
  // Limit to 50 items
  const updated = [newItem, ...history].slice(0, 50);
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.setItem(KEYS.HISTORY, JSON.stringify([]));
};

// Recently Used
export const getRecentTools = (): string[] => {
  try {
    const data = localStorage.getItem(KEYS.RECENT);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addRecentTool = (toolId: string) => {
  const recent = getRecentTools();
  const filtered = recent.filter((id) => id !== toolId);
  const updated = [toolId, ...filtered].slice(0, 6); // Keep last 6
  localStorage.setItem(KEYS.RECENT, JSON.stringify(updated));
};

// Theme
export const getTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem(KEYS.THEME);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light';
};

export const setThemeSetting = (theme: 'light' | 'dark') => {
  localStorage.setItem(KEYS.THEME, theme);
};

// Unit System (Metric vs Imperial)
export const getUnitSystem = (): 'metric' | 'imperial' => {
  const saved = localStorage.getItem(KEYS.UNIT_SYSTEM);
  return saved === 'imperial' ? 'imperial' : 'metric';
};

export const setUnitSystemSetting = (system: 'metric' | 'imperial') => {
  localStorage.setItem(KEYS.UNIT_SYSTEM, system);
};

// Language
export const getLanguage = (): 'en' | 'de' | 'fr' | 'es' | 'it' | 'ja' => {
  const saved = localStorage.getItem('petcalc_language');
  if (saved === 'en' || saved === 'de' || saved === 'fr' || saved === 'es' || saved === 'it' || saved === 'ja') {
    return saved;
  }
  return 'en';
};

export const setLanguageSetting = (lang: 'en' | 'de' | 'fr' | 'es' | 'it' | 'ja') => {
  localStorage.setItem('petcalc_language', lang);
};
