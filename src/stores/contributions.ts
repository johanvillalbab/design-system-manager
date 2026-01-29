import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Branch, Contribution, ContributionStatus, Review, ComponentChange } from '@/types'
import { storage, STORAGE_KEYS } from '@/services/storage'
import { mockBranches, mockContributions } from '@/data/contributions'

function loadBranches(): Branch[] {
  const saved = storage.get<Branch[]>(STORAGE_KEYS.BRANCHES)
  return saved || [...mockBranches]
}

function loadContributions(): Contribution[] {
  const saved = storage.get<Contribution[]>(STORAGE_KEYS.CONTRIBUTIONS)
  return saved || [...mockContributions]
}

export const useContributionsStore = defineStore('contributions', () => {
  // State
  const branches = ref<Branch[]>(loadBranches())
  const contributions = ref<Contribution[]>(loadContributions())
  const selectedContribution = ref<Contribution | null>(null)
  
  // Filters
  const statusFilter = ref<ContributionStatus | null>(null)
  const componentFilter = ref<string | null>(null)
  const authorFilter = ref<string | null>(null)

  // Persist changes
  function saveBranches() {
    storage.set(STORAGE_KEYS.BRANCHES, branches.value)
  }

  function saveContributions() {
    storage.set(STORAGE_KEYS.CONTRIBUTIONS, contributions.value)
  }

  // Getters
  const filteredContributions = computed(() => {
    return contributions.value.filter(contribution => {
      if (statusFilter.value && contribution.status !== statusFilter.value) return false
      if (componentFilter.value && contribution.componentId !== componentFilter.value) return false
      if (authorFilter.value && contribution.author.name !== authorFilter.value) return false
      return true
    })
  })

  const contributionsByStatus = computed(() => ({
    draft: contributions.value.filter(c => c.status === 'draft'),
    pending_review: contributions.value.filter(c => c.status === 'pending_review'),
    approved: contributions.value.filter(c => c.status === 'approved'),
    rejected: contributions.value.filter(c => c.status === 'rejected'),
    merged: contributions.value.filter(c => c.status === 'merged')
  }))

  const stats = computed(() => ({
    total: contributions.value.length,
    pending: contributions.value.filter(c => c.status === 'pending_review').length,
    approved: contributions.value.filter(c => c.status === 'approved').length,
    merged: contributions.value.filter(c => c.status === 'merged').length,
    rejected: contributions.value.filter(c => c.status === 'rejected').length
  }))

  const activeBranches = computed(() => {
    return branches.value.filter(b => !b.isDefault)
  })

  // Actions
  function setStatusFilter(status: ContributionStatus | null) {
    statusFilter.value = status
  }

  function setComponentFilter(componentId: string | null) {
    componentFilter.value = componentId
  }

  function setAuthorFilter(author: string | null) {
    authorFilter.value = author
  }

  function clearFilters() {
    statusFilter.value = null
    componentFilter.value = null
    authorFilter.value = null
  }

  function selectContribution(contributionId: string | null) {
    selectedContribution.value = contributionId
      ? contributions.value.find(c => c.id === contributionId) || null
      : null
  }

  function createBranch(data: Omit<Branch, 'id' | 'createdAt' | 'isDefault'>) {
    const newBranch: Branch = {
      ...data,
      id: `branch-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isDefault: false
    }
    branches.value.push(newBranch)
    saveBranches()
    return newBranch
  }

  function createContribution(data: Omit<Contribution, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) {
    const now = new Date().toISOString()
    const newContribution: Contribution = {
      ...data,
      id: `contrib-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      reviews: []
    }
    contributions.value.unshift(newContribution)
    saveContributions()
    return newContribution
  }

  function updateContribution(contributionId: string, updates: Partial<Contribution>) {
    const index = contributions.value.findIndex(c => c.id === contributionId)
    if (index !== -1) {
      const currentContribution = contributions.value[index]
      contributions.value[index] = {
        ...currentContribution,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Contribution
      if (selectedContribution.value?.id === contributionId) {
        selectedContribution.value = contributions.value[index] ?? null
      }
      saveContributions()
    }
  }

  function submitForReview(contributionId: string) {
    updateContribution(contributionId, { status: 'pending_review' })
  }

  function addReview(contributionId: string, review: Omit<Review, 'id' | 'createdAt'>) {
    const contribution = contributions.value.find(c => c.id === contributionId)
    if (contribution) {
      const newReview: Review = {
        ...review,
        id: `review-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
      contribution.reviews.push(newReview)
      contribution.updatedAt = new Date().toISOString()
      
      // Auto-update status based on review
      if (review.status === 'approved') {
        const allApproved = contribution.reviews.every(r => r.status === 'approved')
        if (allApproved) {
          contribution.status = 'approved'
        }
      } else if (review.status === 'changes_requested') {
        contribution.status = 'pending_review' // Keep in review state
      }
      
      saveContributions()
    }
  }

  function approveContribution(contributionId: string, reviewer: { name: string; avatar: string }, comment: string) {
    addReview(contributionId, {
      author: reviewer,
      status: 'approved',
      comment
    })
    updateContribution(contributionId, { status: 'approved' })
  }

  function rejectContribution(contributionId: string, reviewer: { name: string; avatar: string }, comment: string) {
    addReview(contributionId, {
      author: reviewer,
      status: 'changes_requested',
      comment
    })
    updateContribution(contributionId, { status: 'rejected' })
  }

  function mergeContribution(contributionId: string) {
    updateContribution(contributionId, { status: 'merged' })
    
    // Delete the associated branch
    const contribution = contributions.value.find(c => c.id === contributionId)
    if (contribution) {
      const branchIndex = branches.value.findIndex(b => b.id === contribution.branchId)
      if (branchIndex !== -1) {
        branches.value.splice(branchIndex, 1)
        saveBranches()
      }
    }
  }

  function getBranchesForComponent(componentId: string): Branch[] {
    return branches.value.filter(b => b.componentId === componentId)
  }

  function getContributionsForComponent(componentId: string): Contribution[] {
    return contributions.value.filter(c => c.componentId === componentId)
  }

  function getPendingContributionsForComponent(componentId: string): Contribution[] {
    return contributions.value.filter(
      c => c.componentId === componentId && 
      (c.status === 'pending_review' || c.status === 'approved')
    )
  }

  return {
    // State
    branches,
    contributions,
    selectedContribution,
    statusFilter,
    componentFilter,
    authorFilter,
    // Getters
    filteredContributions,
    contributionsByStatus,
    stats,
    activeBranches,
    // Actions
    setStatusFilter,
    setComponentFilter,
    setAuthorFilter,
    clearFilters,
    selectContribution,
    createBranch,
    createContribution,
    updateContribution,
    submitForReview,
    addReview,
    approveContribution,
    rejectContribution,
    mergeContribution,
    getBranchesForComponent,
    getContributionsForComponent,
    getPendingContributionsForComponent
  }
})
