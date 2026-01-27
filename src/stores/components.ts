import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DesignComponent, ComponentDetail, FilterState, ComponentCategory, ComponentStatus, Platform } from '@/types'
import { mockComponents, getComponentById } from '@/data/components'
import { githubService, dataMapper } from '@/services'

export const useComponentsStore = defineStore('components', () => {
  // State
  const components = ref<DesignComponent[]>(mockComponents)
  const selectedComponent = ref<ComponentDetail | null>(null)
  const filters = ref<FilterState>({
    search: '',
    platforms: [],
    categories: [],
    statuses: []
  })
  
  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)
  const dataSource = ref<'mock' | 'api'>('mock')

  // Getters
  const filteredComponents = computed(() => {
    return components.value.filter(component => {
      // Search filter
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        const matchesSearch = 
          component.name.toLowerCase().includes(search) ||
          component.description.toLowerCase().includes(search) ||
          component.tags.some(tag => tag.toLowerCase().includes(search))
        if (!matchesSearch) return false
      }

      // Platform filter
      if (filters.value.platforms.length > 0) {
        const hasPlatform = filters.value.platforms.some(p => component.platforms.includes(p))
        if (!hasPlatform) return false
      }

      // Category filter
      if (filters.value.categories.length > 0) {
        if (!filters.value.categories.includes(component.category)) return false
      }

      // Status filter
      if (filters.value.statuses.length > 0) {
        if (!filters.value.statuses.includes(component.status)) return false
      }

      return true
    })
  })

  const componentsByCategory = computed(() => {
    const grouped: Record<ComponentCategory, DesignComponent[]> = {
      foundations: [],
      components: [],
      patterns: [],
      templates: []
    }

    filteredComponents.value.forEach(component => {
      grouped[component.category].push(component)
    })

    return grouped
  })

  // Additional state for API data
  const openIssuesCount = ref(13)
  const starsCount = ref(0)
  
  const stats = computed(() => ({
    total: components.value.length,
    stable: components.value.filter(c => c.status === 'stable').length,
    beta: components.value.filter(c => c.status === 'beta').length,
    deprecated: components.value.filter(c => c.status === 'deprecated').length,
    needsUpdate: components.value.filter(c => c.needsUpdate).length,
    coverage: 84,
    openIssues: openIssuesCount.value,
    stars: starsCount.value
  }))

  const categoryStats = computed(() => ({
    foundations: components.value.filter(c => c.category === 'foundations').length,
    components: components.value.filter(c => c.category === 'components').length,
    patterns: components.value.filter(c => c.category === 'patterns').length,
    templates: components.value.filter(c => c.category === 'templates').length
  }))

  // Actions
  function setSearch(search: string) {
    filters.value.search = search
  }

  function togglePlatform(platform: Platform) {
    const index = filters.value.platforms.indexOf(platform)
    if (index === -1) {
      filters.value.platforms.push(platform)
    } else {
      filters.value.platforms.splice(index, 1)
    }
  }

  function toggleCategory(category: ComponentCategory) {
    const index = filters.value.categories.indexOf(category)
    if (index === -1) {
      filters.value.categories.push(category)
    } else {
      filters.value.categories.splice(index, 1)
    }
  }

  function toggleStatus(status: ComponentStatus) {
    const index = filters.value.statuses.indexOf(status)
    if (index === -1) {
      filters.value.statuses.push(status)
    } else {
      filters.value.statuses.splice(index, 1)
    }
  }

  function clearFilters() {
    filters.value = {
      search: '',
      platforms: [],
      categories: [],
      statuses: []
    }
  }

  function loadComponent(id: string) {
    selectedComponent.value = getComponentById(id) || null
  }

  function clearSelectedComponent() {
    selectedComponent.value = null
  }

  /**
   * Fetch components from GitHub API (Ant Design repository)
   */
  async function fetchComponents() {
    loading.value = true
    error.value = null
    
    try {
      // Fetch data from GitHub API
      const [githubComponents, releases, repoInfo] = await Promise.all([
        githubService.getComponentsList(),
        githubService.getReleases(),
        githubService.getRepoInfo()
      ])

      // Map to our DesignComponent format
      components.value = dataMapper.mapToDesignComponents(githubComponents, releases)
      
      // Update stats from repo info
      openIssuesCount.value = repoInfo.open_issues_count
      starsCount.value = repoInfo.stargazers_count
      
      dataSource.value = 'api'
    } catch (e) {
      console.error('Error fetching components from GitHub:', e)
      error.value = e instanceof Error ? e.message : 'Error loading components from API'
      
      // Fallback to mock data
      components.value = mockComponents
      dataSource.value = 'mock'
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset to mock data
   */
  function useMockData() {
    components.value = mockComponents
    openIssuesCount.value = 13
    starsCount.value = 0
    dataSource.value = 'mock'
    error.value = null
  }

  /**
   * Refresh data from API
   */
  async function refreshData() {
    githubService.clearCache()
    await fetchComponents()
  }

  return {
    // State
    components,
    selectedComponent,
    filters,
    loading,
    error,
    dataSource,
    // Getters
    filteredComponents,
    componentsByCategory,
    stats,
    categoryStats,
    // Actions
    setSearch,
    togglePlatform,
    toggleCategory,
    toggleStatus,
    clearFilters,
    loadComponent,
    clearSelectedComponent,
    fetchComponents,
    useMockData,
    refreshData
  }
})
