import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Platform, UsageMetric, ComponentUsage, Alert, Recommendation } from '@/types'
import { 
  adoptionOverTime, 
  topComponents, 
  projectCoverage, 
  platformUsage,
  alerts as mockAlerts,
  recommendations as mockRecommendations,
  analyticsStats,
  implementationTime,
  dependencyGraph
} from '@/data/analytics'
import { npmService, githubService, dataMapper } from '@/services'
import { useComponentsStore } from './components'

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const dateRange = ref<{ start: string; end: string }>({
    start: '2025-07-01',
    end: '2026-01-31'
  })
  const selectedPlatform = ref<Platform | null>(null)
  const selectedTeam = ref<string | null>(null)

  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)
  const dataSource = ref<'mock' | 'api'>('mock')

  // API data state
  const apiAdoptionData = ref<UsageMetric[]>([])
  const apiTopComponents = ref<ComponentUsage[]>([])
  const apiAlerts = ref<Alert[]>([])
  const apiRecommendations = ref<Recommendation[]>([])
  const apiStats = ref({
    totalComponents: analyticsStats.totalComponents,
    adoptionRate: analyticsStats.adoptionRate,
    avgImplementationTime: analyticsStats.avgImplementationTime,
    activeProjects: analyticsStats.activeProjects,
    totalInstances: analyticsStats.totalInstances,
    issuesResolved: analyticsStats.issuesResolved,
    stars: 0,
    forks: 0,
    latestVersion: '',
    totalVersions: 0,
    weeklyDownloads: 0
  })

  // Getters
  const filteredAdoption = computed(() => {
    return dataSource.value === 'api' && apiAdoptionData.value.length > 0
      ? apiAdoptionData.value
      : adoptionOverTime
  })

  const filteredTopComponents = computed(() => {
    const components = dataSource.value === 'api' && apiTopComponents.value.length > 0
      ? apiTopComponents.value
      : topComponents

    if (!selectedPlatform.value) return components
    
    const platformData = platformUsage.find(p => p.platform === selectedPlatform.value)
    if (!platformData) return components
    
    return components.filter(c => platformData.components.includes(c.componentId))
  })

  const filteredProjectCoverage = computed(() => {
    return projectCoverage
  })

  const stats = computed(() => {
    if (dataSource.value === 'api') {
      return apiStats.value
    }
    return analyticsStats
  })

  const activeAlerts = computed(() => {
    return dataSource.value === 'api' && apiAlerts.value.length > 0
      ? apiAlerts.value
      : mockAlerts
  })

  const activeRecommendations = computed(() => {
    return dataSource.value === 'api' && apiRecommendations.value.length > 0
      ? apiRecommendations.value
      : mockRecommendations
  })

  const avgImplementationTime = computed(() => {
    const total = implementationTime.reduce((acc, item) => acc + item.days, 0)
    return (total / implementationTime.length).toFixed(1)
  })

  const chartData = computed(() => {
    const adoptionSource = dataSource.value === 'api' && apiAdoptionData.value.length > 0
      ? apiAdoptionData.value
      : adoptionOverTime
    
    const componentsSource = dataSource.value === 'api' && apiTopComponents.value.length > 0
      ? apiTopComponents.value
      : topComponents

    return {
      adoption: {
        labels: adoptionSource.map(d => d.date),
        data: adoptionSource.map(d => d.value)
      },
      topComponents: {
        labels: componentsSource.slice(0, 8).map(c => c.componentName),
        data: componentsSource.slice(0, 8).map(c => c.usageCount)
      },
      coverage: {
        labels: projectCoverage.map(p => p.projectName),
        data: projectCoverage.map(p => p.coverage)
      },
      platform: {
        labels: platformUsage.map(p => p.platform.toUpperCase()),
        data: platformUsage.map(p => p.usage)
      }
    }
  })

  const graph = computed(() => dependencyGraph)

  // Actions
  function setDateRange(start: string, end: string) {
    dateRange.value = { start, end }
  }

  function setPlatformFilter(platform: Platform | null) {
    selectedPlatform.value = platform
  }

  function setTeamFilter(team: string | null) {
    selectedTeam.value = team
  }

  function clearFilters() {
    selectedPlatform.value = null
    selectedTeam.value = null
  }

  function dismissAlert(alertId: string) {
    if (dataSource.value === 'api') {
      const index = apiAlerts.value.findIndex(a => a.id === alertId)
      if (index !== -1) {
        apiAlerts.value.splice(index, 1)
      }
    } else {
      const index = mockAlerts.findIndex(a => a.id === alertId)
      if (index !== -1) {
        mockAlerts.splice(index, 1)
      }
    }
  }

  /**
   * Fetch analytics data from npm and GitHub APIs
   */
  async function fetchAnalytics() {
    loading.value = true
    error.value = null

    try {
      // Fetch data from APIs
      const [downloadStats, dailyDownloads, packageInfo, repoInfo, releases, bugIssues] = await Promise.all([
        npmService.getDownloadStats(),
        npmService.getDailyDownloads(),
        npmService.getPackageInfo(),
        githubService.getRepoInfo(),
        githubService.getReleases(),
        githubService.getBugIssues(30)
      ])

      // Get components store for component data
      const componentsStore = useComponentsStore()
      const componentsCount = componentsStore.components.length

      // Map download data to adoption metrics
      apiAdoptionData.value = dataMapper.mapToUsageMetrics(dailyDownloads)

      // Map components to usage data
      apiTopComponents.value = dataMapper.mapToComponentUsage(componentsStore.components)

      // Map to analytics stats
      apiStats.value = dataMapper.mapToAnalyticsStats(
        repoInfo,
        downloadStats,
        packageInfo,
        componentsCount
      )

      // Generate real alerts from data
      apiAlerts.value = dataMapper.generateAlerts(repoInfo, releases, bugIssues.length)

      // Generate real recommendations from data
      apiRecommendations.value = dataMapper.generateRecommendations(bugIssues, componentsStore.components)

      dataSource.value = 'api'
    } catch (e) {
      console.error('Error fetching analytics from APIs:', e)
      error.value = e instanceof Error ? e.message : 'Error loading analytics from API'
      dataSource.value = 'mock'
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset to mock data
   */
  function useMockData() {
    apiAdoptionData.value = []
    apiTopComponents.value = []
    apiAlerts.value = []
    apiRecommendations.value = []
    apiStats.value = {
      ...analyticsStats,
      stars: 0,
      forks: 0,
      latestVersion: '',
      totalVersions: 0,
      weeklyDownloads: 0
    }
    dataSource.value = 'mock'
    error.value = null
  }

  /**
   * Refresh data from API
   */
  async function refreshData() {
    npmService.clearCache()
    await fetchAnalytics()
  }

  return {
    // State
    dateRange,
    selectedPlatform,
    selectedTeam,
    loading,
    error,
    dataSource,
    // Getters
    filteredAdoption,
    filteredTopComponents,
    filteredProjectCoverage,
    stats,
    activeAlerts,
    activeRecommendations,
    avgImplementationTime,
    chartData,
    graph,
    // Actions
    setDateRange,
    setPlatformFilter,
    setTeamFilter,
    clearFilters,
    dismissAlert,
    fetchAnalytics,
    useMockData,
    refreshData
  }
})
