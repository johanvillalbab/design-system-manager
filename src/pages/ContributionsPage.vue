<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContributionsStore } from '@/stores/contributions'
import { useComponentsStore } from '@/stores/components'
import MetricCard from '@/components/common/MetricCard.vue'
import type { Contribution, ContributionStatus } from '@/types'
import {
  GitPullRequest,
  GitMerge,
  GitBranch,
  Clock,
  Check,
  X,
  MessageSquare,
  Plus,
  Filter,
  ChevronRight,
  User,
  FileCode,
  AlertCircle
} from 'lucide-vue-next'

const store = useContributionsStore()
const componentsStore = useComponentsStore()

const showDetailModal = ref(false)
const showCreateModal = ref(false)

// New contribution form
const newContribution = ref({
  title: '',
  description: '',
  componentId: '',
  branchName: ''
})

const statusFilters = [
  { id: null, label: 'All', icon: Filter },
  { id: 'pending_review', label: 'Pending', icon: Clock },
  { id: 'approved', label: 'Approved', icon: Check },
  { id: 'merged', label: 'Merged', icon: GitMerge },
  { id: 'rejected', label: 'Rejected', icon: X }
]

const statusConfig: Record<ContributionStatus, { color: string; bg: string; icon: any }> = {
  draft: { color: 'text-text-muted', bg: 'bg-surface-700/50', icon: GitBranch },
  pending_review: { color: 'text-warning-400', bg: 'bg-warning-500/10', icon: Clock },
  approved: { color: 'text-success-400', bg: 'bg-success-500/10', icon: Check },
  rejected: { color: 'text-danger-400', bg: 'bg-danger-500/10', icon: X },
  merged: { color: 'text-violet-400', bg: 'bg-violet-500/10', icon: GitMerge }
}

function openDetail(contribution: Contribution) {
  store.selectContribution(contribution.id)
  showDetailModal.value = true
}

function closeDetail() {
  store.selectContribution(null)
  showDetailModal.value = false
}

function openCreateModal() {
  newContribution.value = {
    title: '',
    description: '',
    componentId: '',
    branchName: ''
  }
  showCreateModal.value = true
}

function createContribution() {
  if (!newContribution.value.title.trim() || !newContribution.value.componentId) return
  
  // Create branch first
  const branch = store.createBranch({
    name: newContribution.value.branchName || `feat/${newContribution.value.title.toLowerCase().replace(/\s+/g, '-')}`,
    componentId: newContribution.value.componentId,
    basedOn: 'main',
    author: { name: 'Sho Villalba', avatar: '/profile.png' }
  })
  
  // Create contribution
  store.createContribution({
    title: newContribution.value.title,
    description: newContribution.value.description,
    branchId: branch.id,
    componentId: newContribution.value.componentId,
    status: 'draft',
    author: { name: 'Sho Villalba', avatar: '/profile.png' },
    changes: []
  })
  
  showCreateModal.value = false
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getComponentName(componentId: string) {
  const component = componentsStore.components.find(c => c.id === componentId)
  return component?.name || componentId
}

function getBranchName(branchId: string) {
  const branch = store.branches.find(b => b.id === branchId)
  return branch?.name || branchId
}

function handleApprove() {
  if (!store.selectedContribution) return
  store.approveContribution(
    store.selectedContribution.id,
    { name: 'Sho Villalba', avatar: '/profile.png' },
    'Approved! Ready to merge.'
  )
}

function handleReject() {
  if (!store.selectedContribution) return
  store.rejectContribution(
    store.selectedContribution.id,
    { name: 'Sho Villalba', avatar: '/profile.png' },
    'Changes requested. Please address the feedback.'
  )
}

function handleMerge() {
  if (!store.selectedContribution) return
  store.mergeContribution(store.selectedContribution.id)
  closeDetail()
}
</script>

<template>
  <div class="space-y-7">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Pending Review"
        :value="store.stats.pending"
        :icon="Clock"
        color="warning"
        class="animate-fade-up stagger-1"
      />
      <MetricCard
        title="Approved"
        :value="store.stats.approved"
        :icon="Check"
        color="success"
        class="animate-fade-up stagger-2"
      />
      <MetricCard
        title="Merged"
        :value="store.stats.merged"
        :icon="GitMerge"
        color="primary"
        class="animate-fade-up stagger-3"
      />
      <MetricCard
        title="Active Branches"
        :value="store.activeBranches.length"
        :icon="GitBranch"
        color="primary"
        class="animate-fade-up stagger-4"
      />
    </div>

    <!-- Filters & Actions -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-800/40 border border-border rounded-2xl p-4 animate-fade-up stagger-5">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="filter in statusFilters"
          :key="filter.label"
          @click="store.setStatusFilter(filter.id as ContributionStatus | null)"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :class="[
            store.statusFilter === filter.id
              ? 'bg-accent-500/15 text-accent-400'
              : 'text-text-muted hover:text-text-secondary hover:bg-surface-700/50'
          ]"
        >
          <component :is="filter.icon" class="w-3.5 h-3.5" />
          {{ filter.label }}
        </button>
      </div>

      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
      >
        <Plus class="w-4 h-4" />
        New Contribution
      </button>
    </div>

    <!-- Contributions List -->
    <div class="space-y-3">
      <div
        v-for="(contribution, index) in store.filteredContributions"
        :key="contribution.id"
        @click="openDetail(contribution)"
        class="bg-surface-800/40 border border-border rounded-xl p-4 cursor-pointer hover:bg-surface-800/70 hover:border-accent-500/20 transition-all animate-fade-up"
        :style="{ animationDelay: `${Math.min(index * 0.03, 0.2)}s` }"
      >
        <div class="flex items-start gap-4">
          <!-- Status Icon -->
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="statusConfig[contribution.status].bg"
          >
            <GitPullRequest 
              class="w-5 h-5"
              :class="statusConfig[contribution.status].color"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-medium text-text-primary text-sm leading-snug">{{ contribution.title }}</h3>
                <p class="text-xs text-text-muted mt-1 line-clamp-1">{{ contribution.description }}</p>
              </div>
              
              <!-- Status Badge -->
              <span 
                class="px-2.5 py-1 text-[10px] font-medium rounded-lg flex items-center gap-1 flex-shrink-0"
                :class="[statusConfig[contribution.status].bg, statusConfig[contribution.status].color]"
              >
                <component :is="statusConfig[contribution.status].icon" class="w-3 h-3" />
                {{ contribution.status.replace('_', ' ') }}
              </span>
            </div>

            <!-- Meta -->
            <div class="flex items-center gap-4 mt-3 text-[11px] text-text-muted">
              <span class="flex items-center gap-1">
                <GitBranch class="w-3 h-3" />
                {{ getBranchName(contribution.branchId) }}
              </span>
              
              <span class="flex items-center gap-1">
                <FileCode class="w-3 h-3" />
                {{ getComponentName(contribution.componentId) }}
              </span>
              
              <span class="flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ formatDate(contribution.createdAt) }}
              </span>
              
              <span v-if="contribution.reviews.length" class="flex items-center gap-1">
                <MessageSquare class="w-3 h-3" />
                {{ contribution.reviews.length }} reviews
              </span>
              
              <span class="flex items-center gap-1">
                <img :src="contribution.author.avatar" class="w-4 h-4 rounded-full" />
                {{ contribution.author.name }}
              </span>
            </div>
          </div>

          <ChevronRight class="w-4 h-4 text-text-muted" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="store.filteredContributions.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center bg-surface-800/40 border border-border rounded-2xl"
      >
        <div class="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mb-5 border border-accent-500/15">
          <GitPullRequest class="w-7 h-7 text-accent-400" />
        </div>
        <h3 class="text-lg font-semibold text-text-primary mb-2">No Contributions Found</h3>
        <p class="text-sm text-text-muted max-w-md">
          No contributions match your current filters. Start by creating a new contribution.
        </p>
      </div>
    </div>

    <!-- Create Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showCreateModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
          @click.self="showCreateModal = false"
        >
          <div class="w-full max-w-lg bg-surface-800 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div class="flex items-center justify-between p-5 border-b border-border">
              <h2 class="text-lg font-semibold text-text-primary">New Contribution</h2>
              <button @click="showCreateModal = false" class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted">
                <X class="w-4 h-4" />
              </button>
            </div>

            <div class="p-5 space-y-4">
              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Title</label>
                <input
                  v-model="newContribution.title"
                  type="text"
                  placeholder="Brief description of changes"
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea
                  v-model="newContribution.description"
                  rows="3"
                  placeholder="Detailed explanation of the changes..."
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40 resize-none"
                ></textarea>
              </div>

              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Component</label>
                <select
                  v-model="newContribution.componentId"
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary"
                >
                  <option value="">Select a component</option>
                  <option v-for="c in componentsStore.components" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Branch Name (optional)</label>
                <input
                  v-model="newContribution.branchName"
                  type="text"
                  placeholder="feat/my-feature (auto-generated if empty)"
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 p-5 border-t border-border">
              <button
                @click="showCreateModal = false"
                class="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                @click="createContribution"
                :disabled="!newContribution.title.trim() || !newContribution.componentId"
                class="px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20 disabled:opacity-50"
              >
                Create Contribution
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Detail Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDetailModal && store.selectedContribution"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
          @click.self="closeDetail"
        >
          <div class="w-full max-w-3xl bg-surface-800 border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="flex items-start justify-between p-5 border-b border-border">
              <div class="flex items-start gap-3">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="statusConfig[store.selectedContribution.status].bg"
                >
                  <GitPullRequest 
                    class="w-5 h-5"
                    :class="statusConfig[store.selectedContribution.status].color"
                  />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-text-primary">{{ store.selectedContribution.title }}</h2>
                  <div class="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span class="flex items-center gap-1">
                      <GitBranch class="w-3 h-3" />
                      {{ getBranchName(store.selectedContribution.branchId) }}
                    </span>
                    <span>→</span>
                    <span>main</span>
                  </div>
                </div>
              </div>
              <button @click="closeDetail" class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted">
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-5 space-y-5">
              <!-- Description -->
              <div>
                <p class="text-sm text-text-secondary leading-relaxed">{{ store.selectedContribution.description }}</p>
              </div>

              <!-- Changes -->
              <div v-if="store.selectedContribution.changes.length">
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Changes</h3>
                <div class="space-y-2">
                  <div
                    v-for="(change, i) in store.selectedContribution.changes"
                    :key="i"
                    class="p-3 bg-surface-700/30 rounded-xl border border-border/50"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-0.5 text-[10px] font-medium rounded bg-accent-500/10 text-accent-400">
                        {{ change.field }}
                      </span>
                      <span class="text-xs text-text-muted">{{ change.description }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-3 text-xs">
                      <div class="p-2 bg-danger-500/5 rounded-lg border border-danger-500/10">
                        <span class="text-danger-400 font-mono">- {{ change.before }}</span>
                      </div>
                      <div class="p-2 bg-success-500/5 rounded-lg border border-success-500/10">
                        <span class="text-success-400 font-mono">+ {{ change.after }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reviews -->
              <div>
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Reviews ({{ store.selectedContribution.reviews.length }})
                </h3>
                
                <div v-if="store.selectedContribution.reviews.length === 0" class="text-sm text-text-muted p-4 bg-surface-700/20 rounded-xl border border-border/50 text-center">
                  No reviews yet
                </div>
                
                <div v-else class="space-y-3">
                  <div
                    v-for="review in store.selectedContribution.reviews"
                    :key="review.id"
                    class="flex gap-3 p-3 bg-surface-700/30 rounded-xl border border-border/50"
                  >
                    <img :src="review.author.avatar" class="w-8 h-8 rounded-lg flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm font-medium text-text-primary">{{ review.author.name }}</span>
                        <span 
                          class="px-2 py-0.5 text-[10px] font-medium rounded"
                          :class="{
                            'bg-success-500/10 text-success-400': review.status === 'approved',
                            'bg-warning-500/10 text-warning-400': review.status === 'changes_requested',
                            'bg-surface-700/50 text-text-muted': review.status === 'commented'
                          }"
                        >
                          {{ review.status.replace('_', ' ') }}
                        </span>
                        <span class="text-[10px] text-text-muted">{{ formatDate(review.createdAt) }}</span>
                      </div>
                      <p class="text-sm text-text-secondary">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between p-5 border-t border-border">
              <div class="flex items-center gap-2 text-xs text-text-muted">
                <img :src="store.selectedContribution.author.avatar" class="w-5 h-5 rounded-full" />
                <span>{{ store.selectedContribution.author.name }}</span>
                <span>•</span>
                <span>{{ formatDate(store.selectedContribution.createdAt) }}</span>
              </div>
              
              <div class="flex gap-2">
                <button
                  v-if="store.selectedContribution.status === 'pending_review'"
                  @click="handleReject"
                  class="px-4 py-2 text-sm font-medium rounded-xl bg-danger-500/10 text-danger-400 border border-danger-500/20 hover:bg-danger-500/20"
                >
                  Request Changes
                </button>
                <button
                  v-if="store.selectedContribution.status === 'pending_review'"
                  @click="handleApprove"
                  class="px-4 py-2 text-sm font-medium rounded-xl bg-success-500/10 text-success-400 border border-success-500/20 hover:bg-success-500/20"
                >
                  Approve
                </button>
                <button
                  v-if="store.selectedContribution.status === 'approved'"
                  @click="handleMerge"
                  class="px-4 py-2 text-sm font-medium rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25"
                >
                  <GitMerge class="w-4 h-4 inline mr-1" />
                  Merge
                </button>
                <button
                  v-if="store.selectedContribution.status === 'draft'"
                  @click="store.submitForReview(store.selectedContribution!.id)"
                  class="px-4 py-2 text-sm font-medium rounded-xl bg-accent-500/15 text-accent-400 border border-accent-500/20 hover:bg-accent-500/25"
                >
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
