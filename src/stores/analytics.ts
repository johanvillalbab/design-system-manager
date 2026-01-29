import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Platform } from '@/types'
import { 
  adoptionOverTime, 
  topComponents, 
  projectCoverage, 
  platformUsage,
  alerts as mockAlerts,
  recommendations as mockRecommendations,
  analyticsStats,
  implementationTime,
  dependencyGraph,
  teamAdoption,
  componentHealth,
  recentActivity
} from '@/data/analytics'

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const dateRange = ref<{ start: string; end: string }>({
    start: '2025-07-01',
    end: '2026-01-31'
  })
  const selectedDateRange = ref<'1m' | '3m' | '6m' | '1y'>('6m')
  const selectedPlatform = ref<Platform | null>(null)
  const selectedTeam = ref<string | null>(null)

  // Getters
  const filteredAdoption = computed(() => {
    const now = new Date()
    let monthsBack = 6
    
    switch (selectedDateRange.value) {
      case '1m': monthsBack = 1; break
      case '3m': monthsBack = 3; break
      case '6m': monthsBack = 6; break
      case '1y': monthsBack = 12; break
    }
    
    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1)
    
    return adoptionOverTime.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= cutoffDate
    })
  })

  const filteredTopComponents = computed(() => {
    if (!selectedPlatform.value) return topComponents
    
    const platformData = platformUsage.find(p => p.platform === selectedPlatform.value)
    if (!platformData) return topComponents
    
    return topComponents.filter(c => platformData.components.includes(c.componentId))
  })

  const filteredProjectCoverage = computed(() => projectCoverage)

  const stats = computed(() => analyticsStats)

  const activeAlerts = computed(() => mockAlerts)

  const activeRecommendations = computed(() => mockRecommendations)

  const avgImplementationTime = computed(() => {
    const total = implementationTime.reduce((acc, item) => acc + item.days, 0)
    return (total / implementationTime.length).toFixed(1)
  })

  const chartData = computed(() => {
    const adoptionData = filteredAdoption.value
    return {
      adoption: {
        labels: adoptionData.map(d => d.date),
        data: adoptionData.map(d => d.value)
      },
      topComponents: {
        labels: topComponents.slice(0, 8).map(c => c.componentName),
        data: topComponents.slice(0, 8).map(c => c.usageCount)
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

  // Team & Health Data (v2.5)
  const teams = computed(() => teamAdoption)
  const health = computed(() => componentHealth)
  const activity = computed(() => recentActivity)

  const avgTeamCoverage = computed(() => {
    if (teamAdoption.length === 0) return 0
    const total = teamAdoption.reduce((acc, team) => acc + team.coverage, 0)
    return Math.round(total / teamAdoption.length)
  })

  const healthyComponents = computed(() => {
    return componentHealth.filter(c => c.bugCount === 0 && c.openIssues <= 1).length
  })

  // Actions
  function setDateRange(start: string, end: string) {
    dateRange.value = { start, end }
  }

  function selectDateRange(range: '1m' | '3m' | '6m' | '1y') {
    selectedDateRange.value = range
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
    const index = mockAlerts.findIndex(a => a.id === alertId)
    if (index !== -1) {
      mockAlerts.splice(index, 1)
    }
  }

  return {
    // State
    dateRange,
    selectedDateRange,
    selectedPlatform,
    selectedTeam,
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
    // v2.5 Getters
    teams,
    health,
    activity,
    avgTeamCoverage,
    healthyComponents,
    // Actions
    setDateRange,
    selectDateRange,
    setPlatformFilter,
    setTeamFilter,
    clearFilters,
    dismissAlert
  }
})
