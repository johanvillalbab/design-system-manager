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
  dependencyGraph
} from '@/data/analytics'

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const dateRange = ref<{ start: string; end: string }>({
    start: '2025-07-01',
    end: '2026-01-31'
  })
  const selectedPlatform = ref<Platform | null>(null)
  const selectedTeam = ref<string | null>(null)

  // Getters
  const filteredAdoption = computed(() => adoptionOverTime)

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
    return {
      adoption: {
        labels: adoptionOverTime.map(d => d.date),
        data: adoptionOverTime.map(d => d.value)
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
    const index = mockAlerts.findIndex(a => a.id === alertId)
    if (index !== -1) {
      mockAlerts.splice(index, 1)
    }
  }

  return {
    // State
    dateRange,
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
    // Actions
    setDateRange,
    setPlatformFilter,
    setTeamFilter,
    clearFilters,
    dismissAlert
  }
})
