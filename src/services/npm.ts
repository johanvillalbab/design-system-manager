import type { 
  NpmPackageInfo, 
  NpmDownloadPoint, 
  NpmDownloadRange 
} from '@/types/api'
import { cache } from './cache'

const REGISTRY_URL = 'https://registry.npmjs.org'
const DOWNLOADS_API_URL = '/npm-api' // Proxied through Vite to avoid CORS

const PACKAGE_NAME = 'antd'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

async function fetchNpm<T>(url: string, cacheKey: string): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(cacheKey)
  if (cached) {
    return cached
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`npm API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json() as T
  
  // Cache the response
  cache.set(cacheKey, data, CACHE_TTL)
  
  return data
}

export const npmService = {
  /**
   * Get package metadata from npm registry
   */
  async getPackageInfo(): Promise<NpmPackageInfo> {
    return fetchNpm<NpmPackageInfo>(
      `${REGISTRY_URL}/${PACKAGE_NAME}`,
      'npm_package_info'
    )
  },

  /**
   * Get download statistics for last month
   */
  async getDownloadStats(): Promise<NpmDownloadPoint> {
    return fetchNpm<NpmDownloadPoint>(
      `${DOWNLOADS_API_URL}/downloads/point/last-month/${PACKAGE_NAME}`,
      'npm_downloads_month'
    )
  },

  /**
   * Get daily download statistics for last month
   */
  async getDailyDownloads(): Promise<NpmDownloadRange> {
    return fetchNpm<NpmDownloadRange>(
      `${DOWNLOADS_API_URL}/downloads/range/last-month/${PACKAGE_NAME}`,
      'npm_downloads_daily'
    )
  },

  /**
   * Get download statistics for last week
   */
  async getWeeklyDownloads(): Promise<NpmDownloadPoint> {
    return fetchNpm<NpmDownloadPoint>(
      `${DOWNLOADS_API_URL}/downloads/point/last-week/${PACKAGE_NAME}`,
      'npm_downloads_week'
    )
  },

  /**
   * Get the latest version number
   */
  async getLatestVersion(): Promise<string> {
    const packageInfo = await this.getPackageInfo()
    return packageInfo['dist-tags'].latest
  },

  /**
   * Get recent versions with their release dates
   */
  async getRecentVersions(count: number = 10): Promise<Array<{ version: string; date: string }>> {
    const packageInfo = await this.getPackageInfo()
    const versions = Object.keys(packageInfo.versions)
    const timeMap = packageInfo.time

    // Get the most recent versions (excluding 'created' and 'modified' keys)
    return versions
      .filter(v => timeMap[v] !== undefined)
      .map(version => ({
        version,
        date: timeMap[version] as string
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count)
  },

  /**
   * Clear the npm cache
   */
  clearCache(): void {
    cache.remove('npm_package_info')
    cache.remove('npm_downloads_month')
    cache.remove('npm_downloads_daily')
    cache.remove('npm_downloads_week')
  }
}
