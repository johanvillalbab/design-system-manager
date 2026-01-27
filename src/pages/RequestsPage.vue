<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
  Target,
  ChevronLeft,
  ChevronRight,
  Send,
  Upload,
  Inbox,
  Eye,
  Code,
  CheckCircle,
  RefreshCw,
  Cloud,
  Database,
  Sparkles,
  AlertTriangle
} from 'lucide-vue-next'

const store = useRequestsStore()
const componentsStore = useComponentsStore()

// Fetch data from API on mount
onMounted(async () => {
  await store.fetchRequests()
})

// Toggle between API and mock data
function toggleDataSource() {
  if (store.dataSource === 'api') {
    store.useMockData()
  } else {
    store.fetchRequests()
  }
}

const showWizard = ref(false)
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
  <div class="space-y-6">
    <!-- Data Source Toggle & Status -->
    <div class="flex items-center justify-between bg-surface-800 border border-border rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div 
          class="p-2 rounded-lg"
          :class="store.dataSource === 'api' ? 'bg-success-500/10' : 'bg-surface-700'"
        >
          <Sparkles v-if="store.dataSource === 'api'" class="w-5 h-5 text-success-500" />
          <Database v-else class="w-5 h-5 text-text-muted" />
        </div>
        <div>
          <p class="text-sm font-medium text-text-primary">
            {{ store.dataSource === 'api' ? 'GitHub Feature Requests' : 'Mock Data' }}
          </p>
          <p class="text-xs text-text-muted">
            {{ store.dataSource === 'api' ? 'Real feature requests from ant-design/ant-design' : 'Using local sample data' }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="store.dataSource === 'api'"
          @click="store.refreshData()"
          :disabled="store.loading"
          class="p-2 rounded-lg hover:bg-surface-700 transition-colors disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCw class="w-5 h-5 text-text-secondary" :class="{ 'animate-spin': store.loading }" />
        </button>
        <button
          @click="toggleDataSource()"
          :disabled="store.loading"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          :class="store.dataSource === 'api' 
            ? 'bg-surface-700 text-text-secondary hover:bg-surface-600' 
            : 'bg-primary-600 text-white hover:bg-primary-500'"
        >
          {{ store.dataSource === 'api' ? 'Use Mock Data' : 'Load from GitHub' }}
        </button>
      </div>
    </div>

    <!-- Error Alert -->
    <div 
      v-if="store.error" 
      class="bg-danger-500/10 border border-danger-500/20 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertTriangle class="w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-medium text-danger-500">Error loading requests</p>
        <p class="text-sm text-danger-400 mt-1">{{ store.error }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <RefreshCw class="w-8 h-8 text-primary-500 animate-spin" />
        <p class="text-text-secondary">Loading feature requests from GitHub...</p>
      </div>
    </div>

    <template v-else>
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard 
        title="Total Requests"
        :value="store.stats.total"
        :icon="FileText"
        color="primary"
      />
      <MetricCard 
        title="Submitted"
        :value="store.stats.submitted"
        :icon="Inbox"
        color="warning"
      />
      <MetricCard 
        title="Under Review"
        :value="store.stats.underReview"
        :icon="Eye"
        color="primary"
      />
      <MetricCard 
        title="In Development"
        :value="store.stats.inDevelopment"
        :icon="Code"
        color="primary"
      />
      <MetricCard 
        title="Ready"
        :value="store.stats.ready"
        :icon="CheckCircle"
        color="success"
      />
    </div>

    <!-- Header & New Request Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-semibold text-text-primary">Component Requests</h2>
        <p class="text-text-muted">Submit and vote on new component requests</p>
      </div>
      <button
        @click="openWizard"
        class="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-600/25"
      >
        <Plus class="w-5 h-5" />
        New Request
      </button>
    </div>

    <!-- Status Filters -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="filter in statusFilters"
        :key="filter.label"
        @click="store.setStatusFilter(filter.id as any)"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
        :class="[
          store.statusFilter === filter.id
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
            : 'bg-surface-800 text-text-secondary hover:bg-surface-700 border border-border'
        ]"
      >
        <component :is="filter.icon" class="w-4 h-4" />
        {{ filter.label }}
      </button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Requests List -->
      <div class="lg:col-span-2 space-y-4">
        <RequestCard 
          v-for="request in store.filteredRequests"
          :key="request.id"
          :request="request"
          :has-voted="hasVoted(request.id)"
          @vote="handleVote"
          @view="(id) => console.log('View', id)"
        />

        <div 
          v-if="store.filteredRequests.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center bg-surface-800 border border-border rounded-2xl"
        >
          <div class="w-16 h-16 rounded-2xl bg-surface-700 flex items-center justify-center mb-4">
            <Inbox class="w-8 h-8 text-text-muted" />
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">No requests found</h3>
          <p class="text-text-secondary max-w-md mb-6">
            No component requests match your current filter.
          </p>
          <button
            @click="store.clearFilters()"
            class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Sidebar: Top Voted -->
      <div class="space-y-4">
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <h3 class="font-semibold text-text-primary mb-4">🔥 Most Voted</h3>
          <div class="space-y-3">
            <div 
              v-for="(request, index) in store.topVoted"
              :key="request.id"
              class="flex items-center gap-3 p-3 bg-surface-700/50 rounded-xl hover:bg-surface-700 transition-colors cursor-pointer"
            >
              <span 
                class="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                :class="[
                  index === 0 ? 'bg-warning-500/20 text-warning-500' :
                  index === 1 ? 'bg-text-muted/20 text-text-muted' :
                  index === 2 ? 'bg-warning-600/20 text-warning-600' :
                  'bg-surface-600 text-text-muted'
                ]"
              >
                {{ index + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-primary truncate">{{ request.title }}</p>
                <p class="text-xs text-text-muted">{{ request.votes }} votes</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Request Tips -->
        <div class="bg-gradient-to-br from-primary-600/20 to-primary-600/5 border border-primary-500/30 rounded-2xl p-5">
          <h3 class="font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-primary-400" />
            Pro Tips
          </h3>
          <ul class="space-y-2 text-sm text-text-secondary">
            <li class="flex items-start gap-2">
              <span class="text-primary-400">•</span>
              Include screenshots or mockups for faster review
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary-400">•</span>
              Check existing components before submitting
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary-400">•</span>
              Vote on existing requests you need too
            </li>
          </ul>
        </div>
      </div>
    </div>
    </template>

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
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/80 backdrop-blur-sm"
          @click.self="closeWizard"
        >
          <div class="w-full max-w-2xl bg-surface-800 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-5 border-b border-border">
              <h2 class="text-xl font-semibold text-text-primary">New Component Request</h2>
              <button 
                @click="closeWizard"
                class="p-2 rounded-lg hover:bg-surface-700 text-text-muted hover:text-text-primary transition-colors"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Wizard Stepper -->
            <div class="p-5 border-b border-border">
              <WizardStepper :steps="wizardSteps" :current-step="store.currentWizardStep" />
            </div>

            <!-- Step Content -->
            <div class="p-5 min-h-[300px]">
              <!-- Step 1: What do you need? -->
              <div v-if="store.currentWizardStep === 0" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Component Name</label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="e.g., Date Range Picker"
                    class="w-full px-4 py-3 bg-surface-700 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Description</label>
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    placeholder="Describe what this component should do..."
                    class="w-full px-4 py-3 bg-surface-700 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">User Story</label>
                  <textarea
                    v-model="formData.userStory"
                    rows="2"
                    placeholder="As a [user], I want to [action] so that [benefit]..."
                    class="w-full px-4 py-3 bg-surface-700 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Step 2: Context -->
              <div v-if="store.currentWizardStep === 1" class="space-y-4">
                <p class="text-text-secondary">Upload screenshots or mockups showing where you need this component.</p>
                <div class="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <Upload class="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p class="text-text-primary font-medium mb-1">Drop files here or click to upload</p>
                  <p class="text-sm text-text-muted">PNG, JPG, GIF, or Figma links</p>
                </div>
                <div class="flex gap-2">
                  <div class="flex-1 p-3 bg-surface-700 rounded-xl flex items-center gap-3">
                    <Image class="w-5 h-5 text-text-muted" />
                    <span class="text-sm text-text-secondary">mockup-v1.png</span>
                  </div>
                  <button class="p-3 hover:bg-surface-600 rounded-xl text-text-muted">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Step 3: Similar Components -->
              <div v-if="store.currentWizardStep === 2" class="space-y-4">
                <p class="text-text-secondary">We found some components that might help. Do any of these work for you?</p>
                <div class="space-y-2">
                  <div 
                    v-for="comp in suggestedComponents"
                    :key="comp.id"
                    class="flex items-center justify-between p-4 bg-surface-700 rounded-xl hover:bg-surface-600 transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-surface-600 flex items-center justify-center text-text-muted font-bold">
                        {{ comp.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-medium text-text-primary">{{ comp.name }}</p>
                        <p class="text-sm text-text-muted">{{ comp.description }}</p>
                      </div>
                    </div>
                    <ChevronRight class="w-5 h-5 text-text-muted" />
                  </div>
                </div>
                <p v-if="suggestedComponents.length === 0" class="text-center py-8 text-text-muted">
                  No similar components found. Your request is unique!
                </p>
              </div>

              <!-- Step 4: Priority -->
              <div v-if="store.currentWizardStep === 3" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Priority Level</label>
                  <div class="grid grid-cols-4 gap-2">
                    <button
                      v-for="priority in ['low', 'medium', 'high', 'critical']"
                      :key="priority"
                      @click="formData.priority = priority as any"
                      class="p-3 rounded-xl text-sm font-medium capitalize transition-all"
                      :class="[
                        formData.priority === priority
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-700 text-text-secondary hover:bg-surface-600'
                      ]"
                    >
                      {{ priority }}
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">How many projects need this?</label>
                  <input
                    v-model.number="formData.affectedProjects"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 bg-surface-700 border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div class="p-4 bg-primary-600/10 border border-primary-500/30 rounded-xl">
                  <p class="text-sm text-text-secondary">
                    <strong class="text-text-primary">Ready to submit!</strong> Your request will be reviewed by the design system team.
                  </p>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-between p-5 border-t border-border">
              <button
                v-if="store.currentWizardStep > 0"
                @click="prevStep"
                class="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <ChevronLeft class="w-4 h-4" />
                Back
              </button>
              <div v-else></div>
              
              <button
                v-if="store.currentWizardStep < 3"
                @click="nextStep"
                class="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-colors"
              >
                Continue
                <ChevronRight class="w-4 h-4" />
              </button>
              <button
                v-else
                @click="submitRequest"
                class="flex items-center gap-2 px-5 py-2.5 bg-success-500 hover:bg-success-600 text-white font-medium rounded-xl transition-colors"
              >
                <Send class="w-4 h-4" />
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
