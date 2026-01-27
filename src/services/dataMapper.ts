import type { 
  GitHubContent, 
  GitHubRepoInfo, 
  GitHubRelease,
  NpmPackageInfo,
  NpmDownloadPoint,
  NpmDownloadRange
} from '@/types/api'
import type { 
  DesignComponent, 
  ComponentCategory, 
  ComponentStatus, 
  Platform,
  UsageMetric,
  ComponentUsage
} from '@/types'

// Component categorization based on Ant Design's structure
const PATTERN_COMPONENTS = ['form', 'menu', 'layout', 'grid', 'space', 'flex']
const FOUNDATION_COMPONENTS = ['icon', 'typography', 'config-provider']

// Map component name to a more readable format
function formatComponentName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Determine component category based on name
function getComponentCategory(name: string): ComponentCategory {
  const lowerName = name.toLowerCase()
  
  if (FOUNDATION_COMPONENTS.includes(lowerName)) {
    return 'foundations'
  }
  
  if (PATTERN_COMPONENTS.includes(lowerName)) {
    return 'patterns'
  }
  
  return 'components'
}

// Generate a deterministic "usage count" based on component name
// This simulates usage data since we can't get real usage from public APIs
function generateUsageCount(name: string): number {
  // Popular components get higher counts
  const popularComponents: Record<string, number> = {
    'button': 5842,
    'input': 4256,
    'table': 3987,
    'form': 3654,
    'select': 3421,
    'modal': 2987,
    'card': 2756,
    'menu': 2534,
    'icon': 2321,
    'typography': 2100
  }

  const lowerName = name.toLowerCase()
  if (popularComponents[lowerName]) {
    return popularComponents[lowerName]
  }

  // Generate pseudo-random count based on name hash
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash % 2000) + 100
}

// Generate tags based on component name
function generateTags(name: string): string[] {
  const lowerName = name.toLowerCase()
  const tags: string[] = []

  // Category-based tags
  if (lowerName.includes('input') || lowerName.includes('select') || lowerName.includes('picker')) {
    tags.push('form', 'input')
  }
  if (lowerName.includes('table') || lowerName.includes('list') || lowerName.includes('tree')) {
    tags.push('data-display')
  }
  if (lowerName.includes('modal') || lowerName.includes('drawer') || lowerName.includes('message')) {
    tags.push('feedback')
  }
  if (lowerName.includes('menu') || lowerName.includes('breadcrumb') || lowerName.includes('pagination')) {
    tags.push('navigation')
  }
  if (lowerName.includes('button') || lowerName.includes('switch') || lowerName.includes('checkbox')) {
    tags.push('interactive')
  }

  // Add the component name as a tag
  tags.push(lowerName)

  return tags.length > 0 ? tags : ['component']
}

export const dataMapper = {
  /**
   * Map GitHub component folders to DesignComponent format
   */
  mapToDesignComponents(
    githubComponents: GitHubContent[],
    releases: GitHubRelease[] = []
  ): DesignComponent[] {
    const latestRelease = releases[0]
    const latestVersion = latestRelease?.tag_name?.replace('v', '') || '5.0.0'

    return githubComponents.map((item, index) => {
      const usageCount = generateUsageCount(item.name)
      
      // Determine status based on position and usage
      let status: ComponentStatus = 'stable'
      if (usageCount < 200) {
        status = 'beta'
      }
      
      // Check if it's a deprecated component
      const deprecatedComponents = ['mention', 'back-top']
      if (deprecatedComponents.includes(item.name.toLowerCase())) {
        status = 'deprecated'
      }

      // Determine if needs update (random but consistent)
      const needsUpdate = item.name.charCodeAt(0) % 5 === 0

      // Get last updated date - ensure it's always a string
      const defaultDate: string = new Date().toISOString().split('T')[0] ?? ''
      let lastUpdated: string = defaultDate
      if (latestRelease && latestRelease.published_at) {
        const datePart = latestRelease.published_at.split('T')[0]
        if (datePart) {
          lastUpdated = datePart
        }
      }

      return {
        id: `antd-${item.name}`,
        name: formatComponentName(item.name),
        description: `Ant Design ${formatComponentName(item.name)} component`,
        category: getComponentCategory(item.name),
        version: latestVersion,
        status,
        platforms: ['web'] as Platform[],
        lastUpdated,
        usageCount,
        needsUpdate,
        tags: generateTags(item.name)
      }
    }).sort((a, b) => b.usageCount - a.usageCount)
  },

  /**
   * Map npm download data to usage metrics for charts
   */
  mapToUsageMetrics(downloadRange: NpmDownloadRange): UsageMetric[] {
    // Group by week to get a cleaner chart
    const weeklyData: Record<string, number> = {}
    
    downloadRange.downloads.forEach(day => {
      // Get the week start date (Monday)
      const date = new Date(day.day)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay() + 1)
      const isoString = weekStart.toISOString()
      const weekKey: string = isoString.split('T')[0] as string
      
      weeklyData[weekKey] = (weeklyData[weekKey] ?? 0) + day.downloads
    })

    return Object.entries(weeklyData)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => a.date.localeCompare(b.date))
  },

  /**
   * Map components to top component usage
   */
  mapToComponentUsage(components: DesignComponent[]): ComponentUsage[] {
    return components
      .slice(0, 10)
      .map(c => ({
        componentId: c.id,
        componentName: c.name,
        usageCount: c.usageCount,
        trend: (c.name.charCodeAt(0) % 10) - 3 // Random but consistent trend
      }))
  },

  /**
   * Map repository and npm data to analytics stats
   */
  mapToAnalyticsStats(
    repoInfo: GitHubRepoInfo,
    downloadStats: NpmDownloadPoint,
    packageInfo: NpmPackageInfo,
    componentsCount: number
  ) {
    const versionCount = Object.keys(packageInfo.versions).length

    return {
      totalComponents: componentsCount,
      adoptionRate: 84, // Simulated - would need real data
      avgImplementationTime: 2.3,
      activeProjects: Math.floor(downloadStats.downloads / 100000), // Estimate from downloads
      totalInstances: downloadStats.downloads,
      issuesResolved: repoInfo.open_issues_count,
      stars: repoInfo.stargazers_count,
      forks: repoInfo.forks_count,
      latestVersion: packageInfo['dist-tags'].latest,
      totalVersions: versionCount,
      weeklyDownloads: downloadStats.downloads
    }
  },

  /**
   * Map releases to version history
   */
  mapToVersionHistory(releases: GitHubRelease[]) {
    return releases.map(release => ({
      version: release.tag_name,
      date: release.published_at?.split('T')[0] || '',
      name: release.name || release.tag_name,
      isPrerelease: release.prerelease,
      author: release.author.login
    }))
  }
}
