import type { CacheEntry } from '@/types/api'

const DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

export class CacheService {
  private prefix: string

  constructor(prefix: string = 'dsm_cache_') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  get<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(this.getKey(key))
      if (!stored) return null

      const entry: CacheEntry<T> = JSON.parse(stored)
      
      if (Date.now() > entry.expiresAt) {
        this.remove(key)
        return null
      }

      return entry.data
    } catch {
      return null
    }
  }

  set<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttl
      }
      localStorage.setItem(this.getKey(key), JSON.stringify(entry))
    } catch (e) {
      console.warn('Failed to cache data:', e)
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key))
  }

  clear(): void {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix))
    keys.forEach(k => localStorage.removeItem(k))
  }

  isExpired(key: string): boolean {
    const stored = localStorage.getItem(this.getKey(key))
    if (!stored) return true

    try {
      const entry: CacheEntry<unknown> = JSON.parse(stored)
      return Date.now() > entry.expiresAt
    } catch {
      return true
    }
  }
}

export const cache = new CacheService()
