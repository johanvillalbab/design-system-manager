<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIssuesStore } from '@/stores/issues'
import { useComponentsStore } from '@/stores/components'
import MetricCard from '@/components/common/MetricCard.vue'
import type { Issue, IssueType, IssueStatus, IssuePriority } from '@/types'
import {
  Bug,
  Lightbulb,
  FileText,
  HelpCircle,
  Plus,
  X,
  Filter,
  Search,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Loader2,
  Send,
  User,
  Tag
} from 'lucide-vue-next'

const store = useIssuesStore()
const componentsStore = useComponentsStore()

const showCreateModal = ref(false)
const showDetailModal = ref(false)
const viewMode = ref<'list' | 'kanban'>('list')
const newComment = ref('')

// Form state for new issue
const newIssue = ref({
  title: '',
  description: '',
  type: 'bug' as IssueType,
  priority: 'medium' as IssuePriority,
  componentId: '',
  labels: [] as string[]
})

const typeFilters = [
  { id: null, label: 'All', icon: Filter },
  { id: 'bug', label: 'Bug', icon: Bug },
  { id: 'enhancement', label: 'Enhancement', icon: Lightbulb },
  { id: 'documentation', label: 'Docs', icon: FileText },
  { id: 'question', label: 'Question', icon: HelpCircle }
]

const statusFilters = [
  { id: null, label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' }
]

const priorityConfig = {
  critical: { color: 'text-danger-400 bg-danger-500/10 border-danger-500/20' },
  high: { color: 'text-warning-400 bg-warning-500/10 border-warning-500/20' },
  medium: { color: 'text-accent-400 bg-accent-500/10 border-accent-500/20' },
  low: { color: 'text-text-muted bg-surface-700/50 border-border' }
}

const typeConfig = {
  bug: { icon: Bug, color: 'text-danger-400' },
  enhancement: { icon: Lightbulb, color: 'text-accent-400' },
  documentation: { icon: FileText, color: 'text-text-muted' },
  question: { icon: HelpCircle, color: 'text-violet-400' }
}

const statusConfig = {
  open: { icon: Circle, color: 'text-success-400', bg: 'bg-success-500/10' },
  in_progress: { icon: Loader2, color: 'text-accent-400', bg: 'bg-accent-500/10' },
  resolved: { icon: CheckCircle2, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  closed: { icon: CheckCircle2, color: 'text-text-muted', bg: 'bg-surface-700/50' }
}

function openCreateModal() {
  newIssue.value = {
    title: '',
    description: '',
    type: 'bug',
    priority: 'medium',
    componentId: '',
    labels: []
  }
  showCreateModal.value = true
}

function createIssue() {
  if (!newIssue.value.title.trim()) return
  
  store.createIssue({
    title: newIssue.value.title,
    description: newIssue.value.description,
    type: newIssue.value.type,
    status: 'open',
    priority: newIssue.value.priority,
    componentId: newIssue.value.componentId || undefined,
    labels: newIssue.value.labels,
    author: { name: 'Sho Villalba', avatar: '/profile.png' }
  })
  
  showCreateModal.value = false
}

function openDetail(issue: Issue) {
  store.selectIssue(issue.id)
  showDetailModal.value = true
}

function closeDetail() {
  store.selectIssue(null)
  showDetailModal.value = false
}

function addComment() {
  if (!newComment.value.trim() || !store.selectedIssue) return
  
  store.addComment(
    store.selectedIssue.id,
    newComment.value,
    { name: 'Sho Villalba', avatar: '/profile.png' }
  )
  newComment.value = ''
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

function getComponentName(componentId?: string) {
  if (!componentId) return null
  const component = componentsStore.components.find(c => c.id === componentId)
  return component?.name
}
</script>

<template>
  <div class="space-y-7">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Open Issues"
        :value="store.stats.open"
        :icon="AlertCircle"
        color="warning"
        class="animate-fade-up stagger-1"
      />
      <MetricCard
        title="In Progress"
        :value="store.stats.inProgress"
        :icon="Loader2"
        color="primary"
        class="animate-fade-up stagger-2"
      />
      <MetricCard
        title="Bugs"
        :value="store.stats.bugs"
        :icon="Bug"
        color="danger"
        class="animate-fade-up stagger-3"
      />
      <MetricCard
        title="Enhancements"
        :value="store.stats.enhancements"
        :icon="Lightbulb"
        color="success"
        class="animate-fade-up stagger-4"
      />
    </div>

    <!-- Filters & Actions -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-800/40 border border-border rounded-2xl p-4 animate-fade-up stagger-5">
      <div class="flex flex-wrap items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            :value="store.searchQuery"
            @input="store.setSearch(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search issues..."
            class="pl-9 pr-4 py-2 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 w-48"
          />
        </div>

        <!-- Type Filter -->
        <div class="flex gap-1">
          <button
            v-for="filter in typeFilters"
            :key="filter.label"
            @click="store.setTypeFilter(filter.id as IssueType | null)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="[
              store.typeFilter === filter.id
                ? 'bg-accent-500/15 text-accent-400'
                : 'text-text-muted hover:text-text-secondary hover:bg-surface-700/50'
            ]"
          >
            <component :is="filter.icon" class="w-3.5 h-3.5" />
            {{ filter.label }}
          </button>
        </div>

        <!-- Status Filter -->
        <select
          :value="store.statusFilter || ''"
          @change="store.setStatusFilter(($event.target as HTMLSelectElement).value as IssueStatus || null)"
          class="px-3 py-1.5 bg-surface-700/50 border border-border rounded-lg text-xs text-text-primary"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
      >
        <Plus class="w-4 h-4" />
        New Issue
      </button>
    </div>

    <!-- Issues List -->
    <div class="space-y-3">
      <div
        v-for="(issue, index) in store.filteredIssues"
        :key="issue.id"
        @click="openDetail(issue)"
        class="bg-surface-800/40 border border-border rounded-xl p-4 cursor-pointer hover:bg-surface-800/70 hover:border-accent-500/20 transition-all animate-fade-up"
        :style="{ animationDelay: `${Math.min(index * 0.03, 0.2)}s` }"
      >
        <div class="flex items-start gap-4">
          <!-- Type Icon -->
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="statusConfig[issue.status].bg"
          >
            <component 
              :is="typeConfig[issue.type].icon" 
              class="w-5 h-5"
              :class="typeConfig[issue.type].color"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-medium text-text-primary text-sm leading-snug">{{ issue.title }}</h3>
                <p class="text-xs text-text-muted mt-1 line-clamp-1">{{ issue.description }}</p>
              </div>
              
              <!-- Priority Badge -->
              <span 
                class="px-2 py-0.5 text-[10px] font-medium rounded border flex-shrink-0"
                :class="priorityConfig[issue.priority].color"
              >
                {{ issue.priority }}
              </span>
            </div>

            <!-- Meta -->
            <div class="flex items-center gap-4 mt-3 text-[11px] text-text-muted">
              <span class="flex items-center gap-1">
                <component :is="statusConfig[issue.status].icon" class="w-3 h-3" :class="statusConfig[issue.status].color" />
                {{ issue.status.replace('_', ' ') }}
              </span>
              
              <span v-if="getComponentName(issue.componentId)" class="flex items-center gap-1">
                <Tag class="w-3 h-3" />
                {{ getComponentName(issue.componentId) }}
              </span>
              
              <span class="flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ formatDate(issue.createdAt) }}
              </span>
              
              <span v-if="issue.comments.length" class="flex items-center gap-1">
                <MessageSquare class="w-3 h-3" />
                {{ issue.comments.length }}
              </span>
              
              <span v-if="issue.assignee" class="flex items-center gap-1">
                <img :src="issue.assignee.avatar" class="w-4 h-4 rounded-full" />
                {{ issue.assignee.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="store.filteredIssues.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center bg-surface-800/40 border border-border rounded-2xl"
      >
        <div class="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mb-5 border border-accent-500/15">
          <CheckCircle2 class="w-7 h-7 text-accent-400" />
        </div>
        <h3 class="text-lg font-semibold text-text-primary mb-2">No Issues Found</h3>
        <p class="text-sm text-text-muted max-w-md">
          No issues match your current filters. Try adjusting your search or create a new issue.
        </p>
      </div>
    </div>

    <!-- Create Issue Modal -->
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
            <!-- Header -->
            <div class="flex items-center justify-between p-5 border-b border-border">
              <h2 class="text-lg font-semibold text-text-primary">Create Issue</h2>
              <button @click="showCreateModal = false" class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted">
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Form -->
            <div class="p-5 space-y-4">
              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Title</label>
                <input
                  v-model="newIssue.title"
                  type="text"
                  placeholder="Brief description of the issue"
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea
                  v-model="newIssue.description"
                  rows="3"
                  placeholder="Detailed explanation..."
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40 resize-none"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Type</label>
                  <select
                    v-model="newIssue.type"
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary"
                  >
                    <option value="bug">Bug</option>
                    <option value="enhancement">Enhancement</option>
                    <option value="documentation">Documentation</option>
                    <option value="question">Question</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Priority</label>
                  <select
                    v-model="newIssue.priority"
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Related Component</label>
                <select
                  v-model="newIssue.componentId"
                  class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary"
                >
                  <option value="">None</option>
                  <option v-for="c in componentsStore.components" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 p-5 border-t border-border">
              <button
                @click="showCreateModal = false"
                class="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                @click="createIssue"
                :disabled="!newIssue.title.trim()"
                class="px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20 disabled:opacity-50"
              >
                Create Issue
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Issue Detail Modal -->
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
          v-if="showDetailModal && store.selectedIssue"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
          @click.self="closeDetail"
        >
          <div class="w-full max-w-2xl bg-surface-800 border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div class="flex items-start justify-between p-5 border-b border-border">
              <div class="flex items-start gap-3">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="statusConfig[store.selectedIssue.status].bg"
                >
                  <component 
                    :is="typeConfig[store.selectedIssue.type].icon" 
                    class="w-5 h-5"
                    :class="typeConfig[store.selectedIssue.type].color"
                  />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-text-primary">{{ store.selectedIssue.title }}</h2>
                  <div class="flex items-center gap-2 mt-1">
                    <span 
                      class="px-2 py-0.5 text-[10px] font-medium rounded border"
                      :class="priorityConfig[store.selectedIssue.priority].color"
                    >
                      {{ store.selectedIssue.priority }}
                    </span>
                    <span class="text-xs text-text-muted">
                      opened {{ formatDate(store.selectedIssue.createdAt) }} by {{ store.selectedIssue.author.name }}
                    </span>
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
                <p class="text-sm text-text-secondary leading-relaxed">{{ store.selectedIssue.description }}</p>
              </div>

              <!-- Status Actions -->
              <div class="flex gap-2">
                <button
                  v-if="store.selectedIssue.status !== 'in_progress'"
                  @click="store.updateStatus(store.selectedIssue!.id, 'in_progress')"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent-500/10 text-accent-400 border border-accent-500/20 hover:bg-accent-500/20"
                >
                  Start Progress
                </button>
                <button
                  v-if="store.selectedIssue.status === 'in_progress'"
                  @click="store.updateStatus(store.selectedIssue!.id, 'resolved')"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-success-500/10 text-success-400 border border-success-500/20 hover:bg-success-500/20"
                >
                  Mark Resolved
                </button>
                <button
                  v-if="store.selectedIssue.status !== 'closed'"
                  @click="store.closeIssue(store.selectedIssue!.id)"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-700/50 text-text-muted border border-border hover:bg-surface-600/50"
                >
                  Close Issue
                </button>
                <button
                  v-if="store.selectedIssue.status === 'closed'"
                  @click="store.reopenIssue(store.selectedIssue!.id)"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-warning-500/10 text-warning-400 border border-warning-500/20 hover:bg-warning-500/20"
                >
                  Reopen
                </button>
              </div>

              <!-- Comments -->
              <div>
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Comments ({{ store.selectedIssue.comments.length }})
                </h3>
                
                <div class="space-y-3">
                  <div
                    v-for="comment in store.selectedIssue.comments"
                    :key="comment.id"
                    class="flex gap-3 p-3 bg-surface-700/30 rounded-xl border border-border/50"
                  >
                    <img :src="comment.author.avatar" class="w-8 h-8 rounded-lg flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm font-medium text-text-primary">{{ comment.author.name }}</span>
                        <span class="text-[10px] text-text-muted">{{ formatDate(comment.createdAt) }}</span>
                      </div>
                      <p class="text-sm text-text-secondary">{{ comment.content }}</p>
                    </div>
                  </div>

                  <!-- Add Comment -->
                  <div class="flex gap-3 mt-4">
                    <img src="/profile.png" class="w-8 h-8 rounded-lg flex-shrink-0" />
                    <div class="flex-1 relative">
                      <input
                        v-model="newComment"
                        @keydown.enter="addComment"
                        type="text"
                        placeholder="Add a comment..."
                        class="w-full px-4 py-2.5 pr-10 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40"
                      />
                      <button
                        @click="addComment"
                        :disabled="!newComment.trim()"
                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-accent-400 hover:text-accent-300 disabled:opacity-50"
                      >
                        <Send class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
