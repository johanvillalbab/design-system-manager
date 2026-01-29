import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Issue, IssueType, IssueStatus, IssuePriority, IssueComment } from '@/types'
import { storage, STORAGE_KEYS } from '@/services/storage'
import { mockIssues } from '@/data/issues'

function loadIssues(): Issue[] {
  const saved = storage.get<Issue[]>(STORAGE_KEYS.ISSUES)
  return saved || [...mockIssues]
}

export const useIssuesStore = defineStore('issues', () => {
  // State
  const issues = ref<Issue[]>(loadIssues())
  const selectedIssue = ref<Issue | null>(null)
  
  // Filters
  const typeFilter = ref<IssueType | null>(null)
  const statusFilter = ref<IssueStatus | null>(null)
  const priorityFilter = ref<IssuePriority | null>(null)
  const componentFilter = ref<string | null>(null)
  const searchQuery = ref('')

  // Persist changes
  function saveIssues() {
    storage.set(STORAGE_KEYS.ISSUES, issues.value)
  }

  // Getters
  const filteredIssues = computed(() => {
    return issues.value.filter(issue => {
      if (typeFilter.value && issue.type !== typeFilter.value) return false
      if (statusFilter.value && issue.status !== statusFilter.value) return false
      if (priorityFilter.value && issue.priority !== priorityFilter.value) return false
      if (componentFilter.value && issue.componentId !== componentFilter.value) return false
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        const matchesTitle = issue.title.toLowerCase().includes(query)
        const matchesDesc = issue.description.toLowerCase().includes(query)
        const matchesLabels = issue.labels.some(l => l.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesLabels) return false
      }
      return true
    })
  })

  const issuesByStatus = computed(() => ({
    open: issues.value.filter(i => i.status === 'open'),
    in_progress: issues.value.filter(i => i.status === 'in_progress'),
    resolved: issues.value.filter(i => i.status === 'resolved'),
    closed: issues.value.filter(i => i.status === 'closed')
  }))

  const stats = computed(() => ({
    total: issues.value.length,
    open: issues.value.filter(i => i.status === 'open').length,
    inProgress: issues.value.filter(i => i.status === 'in_progress').length,
    resolved: issues.value.filter(i => i.status === 'resolved').length,
    closed: issues.value.filter(i => i.status === 'closed').length,
    bugs: issues.value.filter(i => i.type === 'bug' && i.status !== 'closed').length,
    enhancements: issues.value.filter(i => i.type === 'enhancement' && i.status !== 'closed').length,
    critical: issues.value.filter(i => i.priority === 'critical' && i.status !== 'closed').length
  }))

  const issuesByComponent = computed(() => {
    const map = new Map<string, Issue[]>()
    issues.value.forEach(issue => {
      if (issue.componentId) {
        const existing = map.get(issue.componentId) || []
        existing.push(issue)
        map.set(issue.componentId, existing)
      }
    })
    return map
  })

  // Actions
  function setTypeFilter(type: IssueType | null) {
    typeFilter.value = type
  }

  function setStatusFilter(status: IssueStatus | null) {
    statusFilter.value = status
  }

  function setPriorityFilter(priority: IssuePriority | null) {
    priorityFilter.value = priority
  }

  function setComponentFilter(componentId: string | null) {
    componentFilter.value = componentId
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  function clearFilters() {
    typeFilter.value = null
    statusFilter.value = null
    priorityFilter.value = null
    componentFilter.value = null
    searchQuery.value = ''
  }

  function selectIssue(issueId: string | null) {
    selectedIssue.value = issueId 
      ? issues.value.find(i => i.id === issueId) || null 
      : null
  }

  function createIssue(data: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) {
    const now = new Date().toISOString()
    const newIssue: Issue = {
      ...data,
      id: `issue-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      comments: []
    }
    issues.value.unshift(newIssue)
    saveIssues()
    return newIssue
  }

  function updateIssue(issueId: string, updates: Partial<Issue>) {
    const index = issues.value.findIndex(i => i.id === issueId)
    if (index !== -1) {
      const currentIssue = issues.value[index]
      issues.value[index] = {
        ...currentIssue,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Issue
      if (selectedIssue.value?.id === issueId) {
        selectedIssue.value = issues.value[index] ?? null
      }
      saveIssues()
    }
  }

  function updateStatus(issueId: string, status: IssueStatus) {
    updateIssue(issueId, { status })
  }

  function assignIssue(issueId: string, assignee: { name: string; avatar: string } | undefined) {
    updateIssue(issueId, { assignee })
  }

  function addComment(issueId: string, content: string, author: { name: string; avatar: string }) {
    const issue = issues.value.find(i => i.id === issueId)
    if (issue) {
      const comment: IssueComment = {
        id: `comment-${Date.now()}`,
        author,
        content,
        createdAt: new Date().toISOString()
      }
      issue.comments.push(comment)
      issue.updatedAt = new Date().toISOString()
      saveIssues()
    }
  }

  function closeIssue(issueId: string) {
    updateStatus(issueId, 'closed')
  }

  function reopenIssue(issueId: string) {
    updateStatus(issueId, 'open')
  }

  function deleteIssue(issueId: string) {
    const index = issues.value.findIndex(i => i.id === issueId)
    if (index !== -1) {
      issues.value.splice(index, 1)
      if (selectedIssue.value?.id === issueId) {
        selectedIssue.value = null
      }
      saveIssues()
    }
  }

  function getIssuesForComponent(componentId: string): Issue[] {
    return issues.value.filter(i => i.componentId === componentId)
  }

  return {
    // State
    issues,
    selectedIssue,
    typeFilter,
    statusFilter,
    priorityFilter,
    componentFilter,
    searchQuery,
    // Getters
    filteredIssues,
    issuesByStatus,
    stats,
    issuesByComponent,
    // Actions
    setTypeFilter,
    setStatusFilter,
    setPriorityFilter,
    setComponentFilter,
    setSearch,
    clearFilters,
    selectIssue,
    createIssue,
    updateIssue,
    updateStatus,
    assignIssue,
    addComment,
    closeIssue,
    reopenIssue,
    deleteIssue,
    getIssuesForComponent
  }
})
