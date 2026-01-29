/**
 * LocalStorage service for persisting state
 */

const PREFIX = 'dsm_'

export const storage = {
  /**
   * Get item from localStorage
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(PREFIX + key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error)
      return defaultValue
    }
  },

  /**
   * Set item in localStorage
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error)
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error)
    }
  },

  /**
   * Clear all items with our prefix
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX))
      keys.forEach(k => localStorage.removeItem(k))
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  REQUESTS: 'requests',
  AUDIT_ISSUES: 'audit_issues',
  DISMISSED_ALERTS: 'dismissed_alerts',
  USER_VOTES: 'user_votes'
} as const
