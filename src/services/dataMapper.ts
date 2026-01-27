import type { 
  GitHubContent, 
  GitHubRepoInfo, 
  GitHubRelease,
  GitHubIssue,
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
  ComponentUsage,
  AuditIssue,
  AuditProject,
  IssueSeverity,
  ComponentRequest,
  RequestStatus,
  RequestPriority,
  Alert,
  Recommendation
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
  },

  /**
   * Map GitHub bug issues to AuditIssue format
   */
  mapToAuditIssues(issues: GitHubIssue[]): AuditIssue[] {
    return issues.map((issue, index) => {
      // Determine severity based on labels
      let severity: IssueSeverity = 'medium'
      const labelNames = issue.labels.map(l => l.name.toLowerCase())
      
      if (labelNames.some(l => l.includes('critical') || l.includes('blocker') || l.includes('p0'))) {
        severity = 'critical'
      } else if (labelNames.some(l => l.includes('high') || l.includes('p1') || l.includes('major'))) {
        severity = 'high'
      }

      // Determine issue type based on labels
      let type = 'Bug Report'
      if (labelNames.some(l => l.includes('style') || l.includes('css'))) {
        type = 'Style Issue'
      } else if (labelNames.some(l => l.includes('typescript') || l.includes('type'))) {
        type = 'Type Definition'
      } else if (labelNames.some(l => l.includes('a11y') || l.includes('accessibility'))) {
        type = 'Accessibility'
      } else if (labelNames.some(l => l.includes('docs') || l.includes('documentation'))) {
        type = 'Documentation'
      }

      // Extract component name from labels or title
      const componentLabel = issue.labels.find(l => l.name.toLowerCase().startsWith('component:'))
      const componentName = componentLabel 
        ? componentLabel.name.replace('Component:', '').replace('component:', '').trim()
        : 'General'

      return {
        id: `gh-${issue.number}`,
        severity,
        type,
        title: issue.title.length > 80 ? issue.title.substring(0, 77) + '...' : issue.title,
        description: issue.body?.substring(0, 200) || 'No description provided',
        location: {
          file: `${componentName} Component`,
          page: 'GitHub Issue #' + issue.number,
          frame: issue.labels.map(l => l.name).slice(0, 3).join(', ') || 'No labels'
        },
        suggestion: `View full issue: github.com/ant-design/ant-design/issues/${issue.number}`,
        autoFixable: labelNames.some(l => l.includes('good first issue') || l.includes('easy')),
        screenshot: undefined,
        fixed: false
      }
    })
  },

  /**
   * Map GitHub issues to AuditProject format (grouped by component)
   */
  mapToAuditProjects(issues: GitHubIssue[]): AuditProject[] {
    // Group issues by component
    const componentGroups: Record<string, GitHubIssue[]> = {}
    
    issues.forEach(issue => {
      const componentLabel = issue.labels.find(l => 
        l.name.toLowerCase().startsWith('component:') || 
        l.name.toLowerCase().startsWith('comp:')
      )
      const componentName = componentLabel 
        ? componentLabel.name.replace(/^(component:|comp:)/i, '').trim()
        : 'Other'
      
      if (!componentGroups[componentName]) {
        componentGroups[componentName] = []
      }
      componentGroups[componentName].push(issue)
    })

    // Convert to AuditProject format
    const defaultDate = new Date().toISOString().split('T')[0] ?? ''
    return Object.entries(componentGroups)
      .map(([name, groupIssues], index) => {
        const firstIssue = groupIssues[0]
        const updatedAt = firstIssue?.updated_at
        const lastAudit = updatedAt ? (updatedAt.split('T')[0] ?? defaultDate) : defaultDate
        return {
          id: `proj-${index + 1}`,
          name: formatComponentName(name),
          coverage: Math.max(100 - groupIssues.length * 5, 50), // Simulated coverage
          issues: groupIssues.length,
          lastAudit
        }
      })
      .sort((a, b) => b.issues - a.issues)
      .slice(0, 10)
  },

  /**
   * Map GitHub feature request issues to ComponentRequest format
   */
  mapToComponentRequests(issues: GitHubIssue[]): ComponentRequest[] {
    return issues.map(issue => {
      // Determine priority based on labels and reactions
      let priority: RequestPriority = 'medium'
      const labelNames = issue.labels.map(l => l.name.toLowerCase())
      
      if (labelNames.some(l => l.includes('critical') || l.includes('urgent'))) {
        priority = 'critical'
      } else if (labelNames.some(l => l.includes('high') || l.includes('important'))) {
        priority = 'high'
      } else if (labelNames.some(l => l.includes('low') || l.includes('nice to have'))) {
        priority = 'low'
      }

      // Determine status based on labels
      let status: RequestStatus = 'submitted'
      if (labelNames.some(l => l.includes('reviewing') || l.includes('discussion'))) {
        status = 'under_review'
      } else if (labelNames.some(l => l.includes('in progress') || l.includes('wip') || l.includes('pr'))) {
        status = 'in_development'
      } else if (labelNames.some(l => l.includes('done') || l.includes('completed') || l.includes('released'))) {
        status = 'ready'
      }

      // Calculate votes from comments count (proxy for interest)
      const votes = Math.max(issue.comments, 1)

      const createdAt = issue.created_at.split('T')[0] ?? ''
      const updatedAt = issue.updated_at.split('T')[0] ?? ''
      
      return {
        id: `gh-req-${issue.number}`,
        title: issue.title.length > 60 ? issue.title.substring(0, 57) + '...' : issue.title,
        description: issue.body?.substring(0, 300) || 'No description provided',
        userStory: `As a developer, I want ${issue.title.toLowerCase()} so that I can build better UIs`,
        status,
        priority,
        votes,
        votedBy: Array.from({ length: votes }, (_, i) => `user-${i + 1}`),
        createdAt,
        updatedAt,
        author: {
          name: issue.user.login,
          avatar: issue.user.avatar_url
        },
        attachments: [],
        similarComponents: [],
        affectedProjects: Math.ceil(votes / 3),
        comments: []
      }
    })
  },

  /**
   * Generate alerts from real data
   */
  generateAlerts(
    repoInfo: GitHubRepoInfo,
    releases: GitHubRelease[],
    bugCount: number
  ): Alert[] {
    const alerts: Alert[] = []
    const today: string = new Date().toISOString().split('T')[0] ?? ''

    // Alert for high bug count
    if (bugCount > 50) {
      alerts.push({
        id: 'alert-bugs',
        type: 'warning',
        message: `${bugCount} open bug issues in the repository`,
        date: today
      })
    }

    // Alert for recent release
    const latestRelease = releases[0]
    if (latestRelease) {
      const releaseDate = new Date(latestRelease.published_at || '')
      const daysSinceRelease = Math.floor((Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysSinceRelease <= 7) {
        const releaseDay = latestRelease.published_at?.split('T')[0]
        alerts.push({
          id: 'alert-release',
          type: 'success',
          message: `New release ${latestRelease.tag_name} published ${daysSinceRelease} days ago`,
          date: releaseDay ?? today
        })
      }
    }

    // Alert for high star count milestone
    const starMilestone = Math.floor(repoInfo.stargazers_count / 1000) * 1000
    if (repoInfo.stargazers_count >= 90000) {
      alerts.push({
        id: 'alert-stars',
        type: 'info',
        message: `Repository has reached ${starMilestone.toLocaleString()}+ stars on GitHub`,
        date: today
      })
    }

    return alerts
  },

  /**
   * Generate recommendations from real data
   */
  generateRecommendations(
    issues: GitHubIssue[],
    components: DesignComponent[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = []

    // Find components mentioned in many issues
    const componentMentions: Record<string, number> = {}
    issues.forEach(issue => {
      const titleLower = issue.title.toLowerCase()
      components.forEach(comp => {
        const compName = comp.name.toLowerCase()
        if (titleLower.includes(compName)) {
          componentMentions[comp.id] = (componentMentions[comp.id] || 0) + 1
        }
      })
    })

    // Recommend updating components with many issues
    Object.entries(componentMentions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .forEach(([compId, count]) => {
        const comp = components.find(c => c.id === compId)
        if (comp && count >= 3) {
          recommendations.push({
            id: `rec-update-${compId}`,
            type: 'update',
            componentId: compId,
            componentName: comp.name,
            reason: `Referenced in ${count} open issues`,
            metric: `${count} issues`
          })
        }
      })

    // Find deprecated components
    components
      .filter(c => c.status === 'deprecated')
      .slice(0, 2)
      .forEach(comp => {
        recommendations.push({
          id: `rec-deprecate-${comp.id}`,
          type: 'deprecate',
          componentId: comp.id,
          componentName: comp.name,
          reason: 'Component is marked as deprecated',
          metric: 'Deprecated'
        })
      })

    // Find beta components ready for promotion
    components
      .filter(c => c.status === 'beta' && c.usageCount > 500)
      .slice(0, 2)
      .forEach(comp => {
        recommendations.push({
          id: `rec-promote-${comp.id}`,
          type: 'promote',
          componentId: comp.id,
          componentName: comp.name,
          reason: 'Beta component with high usage',
          metric: `${comp.usageCount} instances`
        })
      })

    return recommendations.slice(0, 5)
  }
}
