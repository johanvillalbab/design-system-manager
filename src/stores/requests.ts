import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ComponentRequest, RequestStatus, RequestPriority } from '@/types'
import { mockRequests, requestStats } from '@/data/requests'
import { githubService, dataMapper } from '@/services'

export const useRequestsStore = defineStore('requests', () => {
  // State
  const requests = ref<ComponentRequest[]>(mockRequests)
  const statusFilter = ref<RequestStatus | null>(null)
  const priorityFilter = ref<RequestPriority | null>(null)
  const currentWizardStep = ref(0)
  const newRequest = ref<Partial<ComponentRequest>>({})

  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)
  const dataSource = ref<'mock' | 'api'>('mock')

  // Getters
  const filteredRequests = computed(() => {
    return requests.value.filter(request => {
      if (statusFilter.value && request.status !== statusFilter.value) {
        return false
      }
      if (priorityFilter.value && request.priority !== priorityFilter.value) {
        return false
      }
      return true
    })
  })

  const requestsByStatus = computed(() => ({
    submitted: requests.value.filter(r => r.status === 'submitted'),
    under_review: requests.value.filter(r => r.status === 'under_review'),
    in_development: requests.value.filter(r => r.status === 'in_development'),
    ready: requests.value.filter(r => r.status === 'ready')
  }))

  const stats = computed(() => ({
    ...requestStats,
    total: requests.value.length,
    submitted: requests.value.filter(r => r.status === 'submitted').length,
    underReview: requests.value.filter(r => r.status === 'under_review').length,
    inDevelopment: requests.value.filter(r => r.status === 'in_development').length,
    ready: requests.value.filter(r => r.status === 'ready').length
  }))

  const topVoted = computed(() => {
    return [...requests.value]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5)
  })

  // Actions
  function setStatusFilter(status: RequestStatus | null) {
    statusFilter.value = status
  }

  function setPriorityFilter(priority: RequestPriority | null) {
    priorityFilter.value = priority
  }

  function voteForRequest(requestId: string, userId: string) {
    const request = requests.value.find(r => r.id === requestId)
    if (request && !request.votedBy.includes(userId)) {
      request.votes++
      request.votedBy.push(userId)
    }
  }

  function removeVote(requestId: string, userId: string) {
    const request = requests.value.find(r => r.id === requestId)
    if (request && request.votedBy.includes(userId)) {
      request.votes--
      request.votedBy = request.votedBy.filter(id => id !== userId)
    }
  }

  function nextWizardStep() {
    if (currentWizardStep.value < 3) {
      currentWizardStep.value++
    }
  }

  function prevWizardStep() {
    if (currentWizardStep.value > 0) {
      currentWizardStep.value--
    }
  }

  function resetWizard() {
    currentWizardStep.value = 0
    newRequest.value = {}
  }

  function updateNewRequest(data: Partial<ComponentRequest>) {
    newRequest.value = { ...newRequest.value, ...data }
  }

  function submitRequest() {
    const id = `req-${String(requests.value.length + 1).padStart(3, '0')}`
    const now: string = new Date().toISOString().split('T')[0] ?? new Date().toISOString()
    
    const request: ComponentRequest = {
      id,
      title: newRequest.value.title || '',
      description: newRequest.value.description || '',
      userStory: newRequest.value.userStory || '',
      status: 'submitted',
      priority: newRequest.value.priority || 'medium',
      votes: 1,
      votedBy: ['current-user'],
      createdAt: now,
      updatedAt: now,
      author: {
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/40?img=25'
      },
      attachments: newRequest.value.attachments || [],
      similarComponents: newRequest.value.similarComponents || [],
      affectedProjects: newRequest.value.affectedProjects || 1,
      comments: []
    }

    requests.value.unshift(request)
    resetWizard()
  }

  function clearFilters() {
    statusFilter.value = null
    priorityFilter.value = null
  }

  /**
   * Fetch feature requests from GitHub API
   */
  async function fetchRequests() {
    loading.value = true
    error.value = null

    try {
      // Fetch feature request issues from GitHub
      const featureIssues = await githubService.getFeatureRequests(50)

      // Map to our ComponentRequest format
      requests.value = dataMapper.mapToComponentRequests(featureIssues)

      dataSource.value = 'api'
    } catch (e) {
      console.error('Error fetching requests from GitHub:', e)
      error.value = e instanceof Error ? e.message : 'Error loading requests'
      
      // Fallback to mock data
      requests.value = mockRequests
      dataSource.value = 'mock'
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset to mock data
   */
  function useMockData() {
    requests.value = mockRequests
    dataSource.value = 'mock'
    error.value = null
  }

  /**
   * Refresh data from API
   */
  async function refreshData() {
    githubService.clearCache()
    await fetchRequests()
  }

  return {
    // State
    requests,
    statusFilter,
    priorityFilter,
    currentWizardStep,
    newRequest,
    loading,
    error,
    dataSource,
    // Getters
    filteredRequests,
    requestsByStatus,
    stats,
    topVoted,
    // Actions
    setStatusFilter,
    setPriorityFilter,
    voteForRequest,
    removeVote,
    nextWizardStep,
    prevWizardStep,
    resetWizard,
    updateNewRequest,
    submitRequest,
    clearFilters,
    fetchRequests,
    useMockData,
    refreshData
  }
})
