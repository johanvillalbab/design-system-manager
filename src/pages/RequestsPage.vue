<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestsStore } from '@/stores/requests'
import { useComponentsStore } from '@/stores/components'
import RequestCard from '@/components/common/RequestCard.vue'
import WizardStepper from '@/components/ui/WizardStepper.vue'
import MetricCard from '@/components/common/MetricCard.vue'
import {
  Plus,
  X,
  FileText,
  Image,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Send,
  Upload,
  Inbox,
  Eye,
  Code,
  CheckCircle,
  MessageSquare,
  Calendar,
  Users,
  ArrowUp
} from 'lucide-vue-next'
import type { ComponentRequest } from '@/types'

const store = useRequestsStore()
const componentsStore = useComponentsStore()

const showWizard = ref(false)
const showDetailModal = ref(false)
const selectedRequest = ref<ComponentRequest | null>(null)
const currentUserId = 'current-user'

const wizardSteps = [
  { id: 'need', label: '¿Qué necesitas?', description: 'Describe tu necesidad' },
  { id: 'context', label: 'Contexto', description: 'Sube referencias' },
  { id: 'similar', label: 'Similares', description: 'Componentes existentes' },
  { id: 'priority', label: 'Prioridad', description: 'Impacto y urgencia' }
]

const statusFilters = [
  { id: null, label: 'All', icon: Inbox },
  { id: 'submitted', label: 'Submitted', icon: FileText },
  { id: 'under_review', label: 'Under Review', icon: Eye },
  { id: 'in_development', label: 'In Development', icon: Code },
  { id: 'ready', label: 'Ready', icon: CheckCircle }
]

// Form state
const formData = ref({
  title: '',
  description: '',
  userStory: '',
  priority: 'medium' as const,
  attachments: [] as string[],
  affectedProjects: 1
})

const suggestedComponents = computed(() => {
  if (!formData.value.title) return []
  const search = formData.value.title.toLowerCase()
  return componentsStore.components.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.tags.some(t => t.toLowerCase().includes(search))
  ).slice(0, 4)
})

function hasVoted(requestId: string) {
  const request = store.requests.find(r => r.id === requestId)
  return request?.votedBy.includes(currentUserId) || false
}

function handleVote(requestId: string) {
  if (hasVoted(requestId)) {
    store.removeVote(requestId, currentUserId)
  } else {
    store.voteForRequest(requestId, currentUserId)
  }
}

function handleViewRequest(requestId: string) {
  const request = store.requests.find(r => r.id === requestId)
  if (request) {
    selectedRequest.value = request
    showDetailModal.value = true
  }
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedRequest.value = null
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    submitted: 'bg-warning-500/15 text-warning-400 border-warning-500/20',
    under_review: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
    in_development: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
    ready: 'bg-success-500/15 text-success-400 border-success-500/20'
  }
  return colors[status] || 'bg-surface-700/50 text-text-muted border-border'
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function openWizard() {
  showWizard.value = true
  store.resetWizard()
  formData.value = {
    title: '',
    description: '',
    userStory: '',
    priority: 'medium',
    attachments: [],
    affectedProjects: 1
  }
}

function closeWizard() {
  showWizard.value = false
  store.resetWizard()
}

function nextStep() {
  store.nextWizardStep()
}

function prevStep() {
  store.prevWizardStep()
}

function submitRequest() {
  store.updateNewRequest({
    title: formData.value.title,
    description: formData.value.description,
    userStory: formData.value.userStory,
    priority: formData.value.priority,
    affectedProjects: formData.value.affectedProjects,
    similarComponents: suggestedComponents.value.map(c => c.id)
  })
  store.submitRequest()
  closeWizard()
}
</script>

<template>
  <div class="space-y-7">
    <!-- Stats Overview with Staggered Animation -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard title="Total Requests" :value="store.stats.total" :icon="FileText" color="primary" class="animate-fade-up stagger-1" />
      <MetricCard title="Submitted" :value="store.stats.submitted" :icon="Inbox" color="warning" class="animate-fade-up stagger-2" />
      <MetricCard title="Under Review" :value="store.stats.underReview" :icon="Eye" color="primary" class="animate-fade-up stagger-3" />
      <MetricCard title="In Development" :value="store.stats.inDevelopment" :icon="Code" color="primary" class="animate-fade-up stagger-4" />
      <MetricCard title="Ready" :value="store.stats.ready" :icon="CheckCircle" color="success" class="animate-fade-up stagger-5" />
    </div>

    <!-- Header & New Request Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up stagger-6">
      <div>
        <h2 class="text-lg font-display font-semibold text-text-primary tracking-tight">Component Requests</h2>
        <p class="text-xs text-text-muted mt-0.5">Submit and vote on new component requests</p>
      </div>
      <button
        @click="openWizard"
        class="flex items-center gap-2 px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20 shadow-sm shadow-accent-500/10"
      >
        <Plus class="w-4 h-4" />
        New Request
      </button>
    </div>

    <!-- Status Filters -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="filter in statusFilters"
        :key="filter.label"
        @click="store.setStatusFilter(filter.id as any)"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border"
        :class="[
          store.statusFilter === filter.id
            ? 'bg-accent-500/15 text-accent-400 border-accent-500/25 shadow-sm shadow-accent-500/10'
            : 'bg-surface-800/40 text-text-muted hover:bg-surface-700/50 border-border'
        ]"
      >
        <component :is="filter.icon" class="w-3.5 h-3.5" />
        {{ filter.label }}
      </button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Requests List with Animated Transitions -->
      <div class="lg:col-span-2 space-y-4">
        <div class="space-y-4">
          <RequestCard
            v-for="(request, index) in store.filteredRequests"
            :key="request.id"
            :request="request"
            :has-voted="hasVoted(request.id)"
            @vote="handleVote"
            @view="handleViewRequest"
            :style="{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }"
            class="animate-fade-up"
          />
        </div>

        <div
          v-if="store.filteredRequests.length === 0"
          class="flex flex-col items-center justify-center py-20 text-center bg-surface-800/40 border border-border rounded-2xl animate-fade-up"
        >
          <div class="w-16 h-16 rounded-2xl bg-surface-700/50 flex items-center justify-center mb-5 border border-border animate-float">
            <Inbox class="w-7 h-7 text-text-muted" />
          </div>
          <h3 class="text-lg font-display font-semibold text-text-primary mb-2">No requests found</h3>
          <p class="text-sm text-text-muted max-w-md mb-6">
            No component requests match your current filter.
          </p>
          <button
            @click="store.clearFilters()"
            class="px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Sidebar: Top Voted -->
      <div class="space-y-4">
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up stagger-7">
          <h3 class="font-display font-semibold text-text-primary mb-5 text-sm tracking-tight flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
            Most Voted
          </h3>
          <div class="space-y-3">
            <div
              v-for="(request, index) in store.topVoted"
              :key="request.id"
              class="flex items-center gap-3 p-3 bg-surface-700/20 rounded-xl hover:bg-surface-700/40 transition-all cursor-pointer border border-border/30 hover:border-border/60"
            >
              <span
                class="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono"
                :class="[
                  index === 0 ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20' :
                  index === 1 ? 'bg-surface-600/40 text-text-muted border border-border/50' :
                  index === 2 ? 'bg-surface-600/30 text-text-muted border border-border/30' :
                  'bg-surface-600/20 text-text-muted border border-border/20'
                ]"
              >
                {{ index + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-primary truncate">{{ request.title }}</p>
                <p class="text-[10px] text-text-muted font-mono">{{ request.votes }} votes</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Request Tips -->
        <div class="bg-accent-500/5 border border-accent-500/10 rounded-2xl p-5 animate-fade-up stagger-8">
          <h3 class="font-display font-semibold text-text-primary mb-3 text-sm tracking-tight flex items-center gap-2">
            <Lightbulb class="w-4 h-4 text-accent-400" />
            Pro Tips
          </h3>
          <ul class="space-y-2.5 text-xs text-text-secondary">
            <li class="flex items-start gap-2">
              <span class="text-accent-400 mt-0.5">&#8226;</span>
              Include screenshots or mockups for faster review
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-400 mt-0.5">&#8226;</span>
              Check existing components before submitting
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent-400 mt-0.5">&#8226;</span>
              Vote on existing requests you need too
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Wizard Modal -->
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
          v-if="showWizard"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
          @click.self="closeWizard"
        >
          <div class="w-full max-w-2xl bg-surface-800 border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-5 border-b border-border">
              <h2 class="text-lg font-display font-semibold text-text-primary tracking-tight">New Component Request</h2>
              <button
                @click="closeWizard"
                class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-primary transition-all"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Wizard Stepper -->
            <div class="p-5 border-b border-border">
              <WizardStepper :steps="wizardSteps" :current-step="store.currentWizardStep" />
            </div>

            <!-- Step Content with Transitions -->
            <div class="p-5 min-h-[300px] relative overflow-hidden">
              <Transition name="slide-fade" mode="out-in">
              <!-- Step 1: What do you need? -->
              <div v-if="store.currentWizardStep === 0" key="step-0" class="space-y-4">
                <div>
                  <label class="block text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">Component Name</label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="e.g., Date Range Picker"
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">Description</label>
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    placeholder="Describe what this component should do..."
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 resize-none transition-all"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">User Story</label>
                  <textarea
                    v-model="formData.userStory"
                    rows="2"
                    placeholder="As a [user], I want to [action] so that [benefit]..."
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 resize-none transition-all"
                  ></textarea>
                </div>
              </div>

              <!-- Step 2: Context -->
              <div v-else-if="store.currentWizardStep === 1" key="step-1" class="space-y-4">
                <p class="text-sm text-text-secondary">Upload screenshots or mockups showing where you need this component.</p>
                <div class="border border-dashed border-border rounded-xl p-8 text-center hover:border-accent-500/30 transition-all cursor-pointer">
                  <Upload class="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p class="text-sm text-text-primary font-medium mb-1">Drop files here or click to upload</p>
                  <p class="text-xs text-text-muted">PNG, JPG, GIF, or Figma links</p>
                </div>
                <div class="flex gap-2">
                  <div class="flex-1 p-3 bg-surface-700/50 rounded-xl flex items-center gap-3 border border-border/50">
                    <Image class="w-4 h-4 text-text-muted" />
                    <span class="text-xs text-text-secondary">mockup-v1.png</span>
                  </div>
                  <button class="p-3 hover:bg-surface-600/50 rounded-xl text-text-muted transition-all">
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Step 3: Similar Components -->
              <div v-else-if="store.currentWizardStep === 2" key="step-2" class="space-y-4">
                <p class="text-sm text-text-secondary">We found some components that might help. Do any of these work for you?</p>
                <div class="space-y-2">
                  <div
                    v-for="comp in suggestedComponents"
                    :key="comp.id"
                    class="flex items-center justify-between p-4 bg-surface-700/30 rounded-xl hover:bg-surface-700/50 transition-all cursor-pointer border border-border/50 hover:border-border"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-surface-600/50 flex items-center justify-center text-text-muted font-display font-bold border border-border/50">
                        {{ comp.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-medium text-text-primary text-sm">{{ comp.name }}</p>
                        <p class="text-xs text-text-muted">{{ comp.description }}</p>
                      </div>
                    </div>
                    <ChevronRight class="w-4 h-4 text-text-muted" />
                  </div>
                </div>
                <p v-if="suggestedComponents.length === 0" class="text-center py-8 text-sm text-text-muted">
                  No similar components found. Your request is unique!
                </p>
              </div>

              <!-- Step 4: Priority -->
              <div v-else-if="store.currentWizardStep === 3" key="step-3" class="space-y-4">
                <div>
                  <label class="block text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">Priority Level</label>
                  <div class="grid grid-cols-4 gap-2">
                    <button
                      v-for="priority in ['low', 'medium', 'high', 'critical']"
                      :key="priority"
                      @click="formData.priority = priority as any"
                      class="p-3 rounded-xl text-xs font-medium capitalize transition-all border"
                      :class="[
                        formData.priority === priority
                          ? 'bg-accent-500/15 text-accent-400 border-accent-500/25'
                          : 'bg-surface-700/30 text-text-muted hover:bg-surface-600/40 border-border/50'
                      ]"
                    >
                      {{ priority }}
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-2">How many projects need this?</label>
                  <input
                    v-model.number="formData.affectedProjects"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 transition-all"
                  />
                </div>
                <div class="p-4 bg-accent-500/5 border border-accent-500/10 rounded-xl">
                  <p class="text-xs text-text-secondary">
                    <strong class="text-text-primary">Ready to submit!</strong> Your request will be reviewed by the design system team.
                  </p>
                </div>
              </div>
              </Transition>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-between p-5 border-t border-border">
              <button
                v-if="store.currentWizardStep > 0"
                @click="prevStep"
                class="flex items-center gap-2 px-4 py-2 text-xs text-text-muted hover:text-text-primary transition-all"
              >
                <ChevronLeft class="w-3.5 h-3.5" />
                Back
              </button>
              <div v-else></div>

              <button
                v-if="store.currentWizardStep < 3"
                @click="nextStep"
                class="flex items-center gap-2 px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
              >
                Continue
                <ChevronRight class="w-3.5 h-3.5" />
              </button>
              <button
                v-else
                @click="submitRequest"
                class="flex items-center gap-2 px-5 py-2.5 bg-success-500/15 hover:bg-success-500/25 text-success-400 font-medium rounded-xl transition-all text-sm border border-success-500/20"
              >
                <Send class="w-3.5 h-3.5" />
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Request Detail Modal -->
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
          v-if="showDetailModal && selectedRequest"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
          @click.self="closeDetailModal"
        >
          <div class="w-full max-w-2xl bg-surface-800 border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="flex items-start justify-between p-5 border-b border-border">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <span 
                    class="px-2.5 py-1 text-xs font-medium rounded-lg border"
                    :class="getStatusColor(selectedRequest.status)"
                  >
                    {{ formatStatus(selectedRequest.status) }}
                  </span>
                  <span 
                    class="px-2.5 py-1 text-xs font-medium rounded-lg capitalize"
                    :class="{
                      'bg-danger-500/15 text-danger-400 border border-danger-500/20': selectedRequest.priority === 'critical',
                      'bg-warning-500/15 text-warning-400 border border-warning-500/20': selectedRequest.priority === 'high',
                      'bg-accent-500/15 text-accent-400 border border-accent-500/20': selectedRequest.priority === 'medium',
                      'bg-surface-700/50 text-text-muted border border-border': selectedRequest.priority === 'low'
                    }"
                  >
                    {{ selectedRequest.priority }}
                  </span>
                </div>
                <h2 class="text-lg font-semibold text-text-primary">{{ selectedRequest.title }}</h2>
              </div>
              <button
                @click="closeDetailModal"
                class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-primary transition-all"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Modal Content -->
            <div class="flex-1 overflow-y-auto p-5 space-y-5">
              <!-- Author & Date -->
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <img :src="selectedRequest.author.avatar" :alt="selectedRequest.author.name" class="w-8 h-8 rounded-full" />
                  <div>
                    <p class="text-sm font-medium text-text-primary">{{ selectedRequest.author.name }}</p>
                    <p class="text-xs text-text-muted">Requested</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Calendar class="w-4 h-4" />
                  <span class="text-xs">{{ selectedRequest.createdAt }}</span>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h3>
                <p class="text-sm text-text-secondary leading-relaxed">{{ selectedRequest.description }}</p>
              </div>

              <!-- User Story -->
              <div v-if="selectedRequest.userStory">
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">User Story</h3>
                <p class="text-sm text-text-secondary leading-relaxed italic bg-surface-700/30 p-3 rounded-xl border border-border/50">
                  "{{ selectedRequest.userStory }}"
                </p>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-surface-700/30 rounded-xl p-4 border border-border/50">
                  <div class="flex items-center gap-2 mb-1">
                    <ArrowUp class="w-4 h-4 text-accent-400" />
                    <span class="text-xs text-text-muted">Votes</span>
                  </div>
                  <p class="text-xl font-semibold text-text-primary">{{ selectedRequest.votes }}</p>
                </div>
                <div class="bg-surface-700/30 rounded-xl p-4 border border-border/50">
                  <div class="flex items-center gap-2 mb-1">
                    <Users class="w-4 h-4 text-accent-400" />
                    <span class="text-xs text-text-muted">Projects Affected</span>
                  </div>
                  <p class="text-xl font-semibold text-text-primary">{{ selectedRequest.affectedProjects }}</p>
                </div>
                <div class="bg-surface-700/30 rounded-xl p-4 border border-border/50">
                  <div class="flex items-center gap-2 mb-1">
                    <MessageSquare class="w-4 h-4 text-accent-400" />
                    <span class="text-xs text-text-muted">Comments</span>
                  </div>
                  <p class="text-xl font-semibold text-text-primary">{{ selectedRequest.comments?.length || 0 }}</p>
                </div>
              </div>

              <!-- Comments -->
              <div v-if="selectedRequest.comments && selectedRequest.comments.length > 0">
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Comments</h3>
                <div class="space-y-3">
                  <div 
                    v-for="comment in selectedRequest.comments" 
                    :key="comment.id"
                    class="bg-surface-700/30 rounded-xl p-4 border border-border/50"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <img :src="comment.author.avatar" :alt="comment.author.name" class="w-6 h-6 rounded-full" />
                      <span class="text-sm font-medium text-text-primary">{{ comment.author.name }}</span>
                      <span class="text-xs text-text-muted">{{ comment.date }}</span>
                    </div>
                    <p class="text-sm text-text-secondary">{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-between p-5 border-t border-border">
              <button
                @click="handleVote(selectedRequest.id)"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-medium border"
                :class="hasVoted(selectedRequest.id) 
                  ? 'bg-accent-500/15 text-accent-400 border-accent-500/20' 
                  : 'bg-surface-700/50 text-text-secondary hover:bg-surface-600/50 border-border'"
              >
                <ArrowUp class="w-4 h-4" />
                {{ hasVoted(selectedRequest.id) ? 'Voted' : 'Vote' }}
              </button>
              <button
                @click="closeDetailModal"
                class="px-5 py-2.5 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
