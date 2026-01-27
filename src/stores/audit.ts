import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuditIssue, AuditProject, IssueSeverity } from '@/types'
import { mockAuditIssues, mockProjects, auditStats } from '@/data/audit'
import { githubService, dataMapper } from '@/services'

export const useAuditStore = defineStore('audit', () => {
  // State
  const issues = ref<AuditIssue[]>(mockAuditIssues)
  const projects = ref<AuditProject[]>(mockProjects)
  const selectedSeverity = ref<IssueSeverity | null>(null)
  const selectedProject = ref<string | null>(null)

  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)
  const dataSource = ref<'mock' | 'api'>('mock')

  // Getters
  const filteredIssues = computed(() => {
    return issues.value.filter(issue => {
      if (selectedSeverity.value && issue.severity !== selectedSeverity.value) {
        return false
      }
      if (selectedProject.value) {
        const project = projects.value.find(p => p.id === selectedProject.value)
        if (project) {
          const projectPrefix = project.name.split(' ')[0] ?? ''
          if (!issue.location.file.toLowerCase().includes(projectPrefix.toLowerCase())) {
            return false
          }
        }
      }
      return !issue.fixed
    })
  })

  const issuesBySeverity = computed(() => ({
    critical: issues.value.filter(i => i.severity === 'critical' && !i.fixed),
    high: issues.value.filter(i => i.severity === 'high' && !i.fixed),
    medium: issues.value.filter(i => i.severity === 'medium' && !i.fixed)
  }))

  const stats = computed(() => ({
    ...auditStats,
    totalIssues: issues.value.filter(i => !i.fixed).length,
    critical: issues.value.filter(i => i.severity === 'critical' && !i.fixed).length,
    high: issues.value.filter(i => i.severity === 'high' && !i.fixed).length,
    medium: issues.value.filter(i => i.severity === 'medium' && !i.fixed).length,
    autoFixable: issues.value.filter(i => i.autoFixable && !i.fixed).length,
    avgCoverage: projects.value.length > 0 
      ? Math.round(projects.value.reduce((acc, p) => acc + p.coverage, 0) / projects.value.length)
      : 0
  }))

  const autoFixableIssues = computed(() => {
    return filteredIssues.value.filter(i => i.autoFixable)
  })

  // Actions
  function setSeverityFilter(severity: IssueSeverity | null) {
    selectedSeverity.value = severity
  }

  function setProjectFilter(projectId: string | null) {
    selectedProject.value = projectId
  }

  function fixIssue(issueId: string) {
    const issue = issues.value.find(i => i.id === issueId)
    if (issue) {
      issue.fixed = true
    }
  }

  function fixAllAutoFixable() {
    issues.value.forEach(issue => {
      if (issue.autoFixable && !issue.fixed) {
        issue.fixed = true
      }
    })
  }

  function ignoreIssue(issueId: string) {
    const index = issues.value.findIndex(i => i.id === issueId)
    if (index !== -1) {
      issues.value.splice(index, 1)
    }
  }

  function clearFilters() {
    selectedSeverity.value = null
    selectedProject.value = null
  }

  /**
   * Fetch audit data from GitHub API (bug issues)
   */
  async function fetchAuditData() {
    loading.value = true
    error.value = null

    try {
      // Fetch bug issues from GitHub
      const bugIssues = await githubService.getBugIssues(50)

      // Map to our audit format
      issues.value = dataMapper.mapToAuditIssues(bugIssues)
      projects.value = dataMapper.mapToAuditProjects(bugIssues)

      dataSource.value = 'api'
    } catch (e) {
      console.error('Error fetching audit data from GitHub:', e)
      error.value = e instanceof Error ? e.message : 'Error loading audit data'
      
      // Fallback to mock data
      issues.value = mockAuditIssues
      projects.value = mockProjects
      dataSource.value = 'mock'
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset to mock data
   */
  function useMockData() {
    issues.value = mockAuditIssues
    projects.value = mockProjects
    dataSource.value = 'mock'
    error.value = null
  }

  /**
   * Refresh data from API
   */
  async function refreshData() {
    githubService.clearCache()
    await fetchAuditData()
  }

  return {
    // State
    issues,
    projects,
    selectedSeverity,
    selectedProject,
    loading,
    error,
    dataSource,
    // Getters
    filteredIssues,
    issuesBySeverity,
    stats,
    autoFixableIssues,
    // Actions
    setSeverityFilter,
    setProjectFilter,
    fixIssue,
    fixAllAutoFixable,
    ignoreIssue,
    clearFilters,
    fetchAuditData,
    useMockData,
    refreshData
  }
})
