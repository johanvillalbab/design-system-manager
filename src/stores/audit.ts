import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuditIssue, AuditProject, IssueSeverity } from '@/types'
import { mockAuditIssues, mockProjects, auditStats } from '@/data/audit'
import { storage, STORAGE_KEYS } from '@/services/storage'

// Load saved issues or use mock data
function loadIssues(): AuditIssue[] {
  const saved = storage.get<AuditIssue[]>(STORAGE_KEYS.AUDIT_ISSUES)
  return saved || [...mockAuditIssues]
}

export const useAuditStore = defineStore('audit', () => {
  // State
  const issues = ref<AuditIssue[]>(loadIssues())
  const projects = ref<AuditProject[]>(mockProjects)
  const selectedSeverity = ref<IssueSeverity | null>(null)
  const selectedProject = ref<string | null>(null)

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

  // Persist changes to localStorage
  function saveIssues() {
    storage.set(STORAGE_KEYS.AUDIT_ISSUES, issues.value)
  }

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
      saveIssues()
    }
  }

  function fixAllAutoFixable() {
    issues.value.forEach(issue => {
      if (issue.autoFixable && !issue.fixed) {
        issue.fixed = true
      }
    })
    saveIssues()
  }

  function ignoreIssue(issueId: string) {
    const index = issues.value.findIndex(i => i.id === issueId)
    if (index !== -1) {
      issues.value.splice(index, 1)
      saveIssues()
    }
  }

  function clearFilters() {
    selectedSeverity.value = null
    selectedProject.value = null
  }

  return {
    // State
    issues,
    projects,
    selectedSeverity,
    selectedProject,
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
    clearFilters
  }
})
