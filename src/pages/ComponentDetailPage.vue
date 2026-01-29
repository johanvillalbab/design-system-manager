<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '@/stores/components'
import { useContributionsStore } from '@/stores/contributions'
import { useIssuesStore } from '@/stores/issues'
import StatusBadge from '@/components/common/StatusBadge.vue'
import PlatformBadge from '@/components/common/PlatformBadge.vue'
import TabsPanel from '@/components/ui/TabsPanel.vue'
import { getLifecycle, getAIMetadata } from '@/data/lifecycle'
import {
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Monitor,
  Code2,
  BookOpen,
  Accessibility,
  Layers,
  Clock,
  MessageSquare,
  Send,
  GitBranch,
  GitPullRequest,
  Bug,
  Cpu,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  Figma,
  FileCode,
  TestTube,
  Rocket
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = useComponentsStore()
const contributionsStore = useContributionsStore()
const issuesStore = useIssuesStore()

const activeVariant = ref('default')
const activeDocTab = ref('usage')
const activeCodePlatform = ref('web')
const copiedCode = ref(false)
const newComment = ref('')
const commentSent = ref(false)

// Lifecycle and AI data
const lifecycle = computed(() => {
  if (!component.value) return null
  return getLifecycle(component.value.id)
})

const aiMetadata = computed(() => {
  if (!component.value) return null
  return getAIMetadata(component.value.id)
})

const componentBranches = computed(() => {
  if (!component.value) return []
  return contributionsStore.getBranchesForComponent(component.value.id)
})

const componentContributions = computed(() => {
  if (!component.value) return []
  return contributionsStore.getContributionsForComponent(component.value.id)
})

const componentIssues = computed(() => {
  if (!component.value) return []
  return issuesStore.getIssuesForComponent(component.value.id)
})

const pendingContributions = computed(() => {
  return componentContributions.value.filter(c => c.status === 'pending_review' || c.status === 'approved')
})

const openIssues = computed(() => {
  return componentIssues.value.filter(i => i.status === 'open' || i.status === 'in_progress')
})

const defaultStageConfig = { icon: Circle, color: 'text-text-muted' }
const defaultStatusConfig = { bg: 'bg-surface-700/50', text: 'text-text-muted' }

const lifecycleStageConfig: Record<string, { icon: any; color: string }> = {
  design: { icon: Figma, color: 'text-violet-400' },
  review: { icon: MessageSquare, color: 'text-warning-400' },
  development: { icon: FileCode, color: 'text-accent-400' },
  testing: { icon: TestTube, color: 'text-success-400' },
  release: { icon: Rocket, color: 'text-danger-400' }
}

const lifecycleStatusConfig: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-surface-700/50', text: 'text-text-muted' },
  in_progress: { bg: 'bg-accent-500/10', text: 'text-accent-400' },
  completed: { bg: 'bg-success-500/10', text: 'text-success-400' },
  blocked: { bg: 'bg-danger-500/10', text: 'text-danger-400' }
}

function getStageConfig(type: string) {
  return lifecycleStageConfig[type] || defaultStageConfig
}

function getStatusConfig(status: string) {
  return lifecycleStatusConfig[status] || defaultStatusConfig
}

// Props simulation
const propsState = ref({
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const component = computed(() => store.selectedComponent)

const docTabs = [
  { id: 'usage', label: 'Usage', icon: BookOpen },
  { id: 'anatomy', label: 'Anatomy', icon: Layers },
  { id: 'props', label: 'Props', icon: Code2 },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'lifecycle', label: 'Lifecycle', icon: Rocket },
  { id: 'ai', label: 'AI Context', icon: Cpu }
]

onMounted(() => {
  const id = route.params.id as string
  store.loadComponent(id)
})

onUnmounted(() => {
  store.clearSelectedComponent()
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    store.loadComponent(newId as string)
  }
})

function goBack() {
  router.push('/')
}

function openExternalDocs() {
  // Open documentation in new tab (simulated URL)
  const docsUrl = `https://design-system.example.com/components/${component.value?.id}`
  window.open(docsUrl, '_blank')
}

function sendComment() {
  if (!newComment.value.trim()) return
  
  // Add comment to component (would be saved to store in real implementation)
  if (component.value?.comments) {
    component.value.comments.push({
      id: `c${Date.now()}`,
      author: {
        name: 'Sho Villalba',
        avatar: '/profile.png'
      },
      content: newComment.value,
      date: new Date().toISOString().split('T')[0] || new Date().toISOString()
    })
  }
  
  newComment.value = ''
  commentSent.value = true
  setTimeout(() => commentSent.value = false, 2000)
}

function copyCode() {
  const snippet = component.value?.codeSnippets.find(s => s.platform === activeCodePlatform.value)
  if (snippet) {
    window.navigator.clipboard.writeText(snippet.code)
    copiedCode.value = true
    setTimeout(() => copiedCode.value = false, 2000)
  }
}

function copyAIMetadata() {
  if (aiMetadata.value) {
    window.navigator.clipboard.writeText(JSON.stringify(aiMetadata.value, null, 2))
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="component" class="space-y-7">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="goBack"
          class="p-2.5 rounded-xl bg-surface-800/40 border border-border hover:bg-surface-700/50 text-text-muted hover:text-text-primary transition-all"
        >
          <ArrowLeft class="w-[18px] h-[18px]" />
        </button>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-display font-bold text-text-primary tracking-tight">{{ component.name }}</h1>
            <StatusBadge :status="component.status" />
          </div>
          <p class="text-sm text-text-muted mt-1.5">
            <span class="font-mono text-text-secondary">v{{ component.version }}</span>
            <span class="mx-2 text-border">·</span>
            Last updated {{ formatDate(component.lastUpdated) }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <PlatformBadge v-for="p in component.platforms" :key="p" :platform="p" />
        </div>
        <button 
          @click="openExternalDocs"
          class="p-2.5 rounded-xl bg-surface-800/40 border border-border hover:bg-surface-700/50 text-text-muted hover:text-text-primary transition-all"
          title="Open documentation"
        >
          <ExternalLink class="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>

    <!-- Main Content - Split View -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left: Preview -->
      <div class="space-y-6">
        <!-- Interactive Preview -->
        <div class="bg-surface-800/40 border border-border rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-border">
            <h2 class="font-display font-semibold text-text-primary text-sm tracking-tight">Interactive Preview</h2>
          </div>

          <!-- Variant Tabs -->
          <div class="flex gap-1 p-2 bg-surface-900/50 border-b border-border">
            <button
              v-for="variant in component.variants"
              :key="variant.id"
              @click="activeVariant = variant.id"
              class="px-3 py-1.5 text-xs font-medium rounded-xl transition-all border"
              :class="[
                activeVariant === variant.id
                  ? 'bg-accent-500/15 text-accent-400 border-accent-500/25'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-700/50 border-transparent'
              ]"
            >
              {{ variant.name }}
            </button>
          </div>

          <!-- Preview Area -->
          <div class="p-8 min-h-[200px] flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--color-surface-700)_1px,_transparent_1px)] bg-[size:20px_20px]">
            <!-- Demo Button Component -->
            <button
              class="px-6 py-3 font-medium rounded-xl transition-all duration-200"
              :class="{
                'bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 border border-accent-500/25': propsState.variant === 'primary',
                'bg-surface-700/50 hover:bg-surface-600/50 text-text-primary border border-border': propsState.variant === 'secondary',
                'bg-transparent hover:bg-surface-700/50 text-text-secondary border border-transparent': propsState.variant === 'ghost',
                'bg-danger-500/15 hover:bg-danger-500/25 text-danger-400 border border-danger-500/20': propsState.variant === 'danger',
                'opacity-50 cursor-not-allowed': propsState.disabled || activeVariant === 'disabled',
                'px-4 py-2 text-sm': propsState.size === 'sm',
                'px-8 py-4 text-lg': propsState.size === 'lg'
              }"
              :disabled="propsState.disabled || activeVariant === 'disabled'"
            >
              <span v-if="propsState.loading || activeVariant === 'loading'" class="flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Loading...
              </span>
              <span v-else>Button Label</span>
            </button>
          </div>

          <!-- Props Controls -->
          <div class="p-4 border-t border-border bg-surface-900/30 space-y-4">
            <h3 class="text-[10px] font-medium text-text-muted uppercase tracking-[0.15em]">Adjust Props</h3>

            <div class="grid grid-cols-2 gap-4">
              <!-- Variant -->
              <div>
                <label class="text-[10px] text-text-muted mb-1.5 block uppercase tracking-[0.15em]">Variant</label>
                <select
                  v-model="propsState.variant"
                  class="w-full px-3 py-2 bg-surface-800/60 border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent-500/40 transition-colors"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="ghost">Ghost</option>
                  <option value="danger">Danger</option>
                </select>
              </div>

              <!-- Size -->
              <div>
                <label class="text-[10px] text-text-muted mb-1.5 block uppercase tracking-[0.15em]">Size</label>
                <select
                  v-model="propsState.size"
                  class="w-full px-3 py-2 bg-surface-800/60 border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent-500/40 transition-colors"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <!-- Disabled -->
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="propsState.disabled"
                  class="w-4 h-4 rounded border-border bg-surface-800/60 text-accent-500 focus:ring-accent-500/30"
                />
                <span class="text-sm text-text-secondary">Disabled</span>
              </label>

              <!-- Loading -->
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="propsState.loading"
                  class="w-4 h-4 rounded border-border bg-surface-800/60 text-accent-500 focus:ring-accent-500/30"
                />
                <span class="text-sm text-text-secondary">Loading</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Documentation -->
      <div class="bg-surface-800/40 border border-border rounded-2xl overflow-hidden">
        <TabsPanel :tabs="docTabs" v-model="activeDocTab">
          <!-- Usage Tab -->
          <template #usage>
            <div class="p-5 space-y-6">
              <div>
                <h3 class="font-display font-semibold text-text-primary mb-3 flex items-center gap-2 text-sm tracking-tight">
                  <Check class="w-4 h-4 text-success-400" />
                  When to use
                </h3>
                <ul class="space-y-2.5">
                  <li
                    v-for="(item, index) in component.usage.doList"
                    :key="index"
                    class="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span class="w-1 h-1 rounded-full bg-success-400 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="h-px bg-border"></div>

              <div>
                <h3 class="font-display font-semibold text-text-primary mb-3 flex items-center gap-2 text-sm tracking-tight">
                  <span class="w-4 h-4 flex items-center justify-center text-danger-400 font-bold text-xs">✕</span>
                  When not to use
                </h3>
                <ul class="space-y-2.5">
                  <li
                    v-for="(item, index) in component.usage.dontList"
                    :key="index"
                    class="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span class="w-1 h-1 rounded-full bg-danger-400 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <!-- Anatomy Tab -->
          <template #anatomy>
            <div class="p-5">
              <div class="aspect-video bg-surface-900/50 border border-border rounded-xl flex items-center justify-center">
                <p class="text-text-muted text-sm">Component anatomy diagram</p>
              </div>
              <div class="mt-4 space-y-2">
                <div class="flex items-center gap-3 p-3 bg-surface-700/30 border border-border/50 rounded-xl">
                  <span class="w-6 h-6 rounded-lg bg-accent-500/20 border border-accent-500/25 flex items-center justify-center text-xs font-bold font-mono text-accent-400">1</span>
                  <div>
                    <p class="text-sm font-medium text-text-primary">Label</p>
                    <p class="text-xs text-text-muted">Primary text content</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-surface-700/30 border border-border/50 rounded-xl">
                  <span class="w-6 h-6 rounded-lg bg-accent-500/20 border border-accent-500/25 flex items-center justify-center text-xs font-bold font-mono text-accent-400">2</span>
                  <div>
                    <p class="text-sm font-medium text-text-primary">Icon (optional)</p>
                    <p class="text-xs text-text-muted">Leading or trailing icon</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-surface-700/30 border border-border/50 rounded-xl">
                  <span class="w-6 h-6 rounded-lg bg-accent-500/20 border border-accent-500/25 flex items-center justify-center text-xs font-bold font-mono text-accent-400">3</span>
                  <div>
                    <p class="text-sm font-medium text-text-primary">Container</p>
                    <p class="text-xs text-text-muted">Background and border</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Props Tab -->
          <template #props>
            <div class="p-5">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left border-b border-border">
                      <th class="pb-3 text-[10px] font-medium text-text-muted uppercase tracking-[0.15em]">Name</th>
                      <th class="pb-3 text-[10px] font-medium text-text-muted uppercase tracking-[0.15em]">Type</th>
                      <th class="pb-3 text-[10px] font-medium text-text-muted uppercase tracking-[0.15em]">Default</th>
                      <th class="pb-3 text-[10px] font-medium text-text-muted uppercase tracking-[0.15em]">Required</th>
                    </tr>
                  </thead>
                  <tbody class="text-text-secondary">
                    <tr
                      v-for="prop in component.props"
                      :key="prop.name"
                      class="border-b border-border/50"
                    >
                      <td class="py-3">
                        <code class="text-accent-400 bg-accent-500/10 px-1.5 py-0.5 rounded-md font-mono text-xs">{{ prop.name }}</code>
                      </td>
                      <td class="py-3">
                        <code class="text-text-muted text-xs font-mono">{{ prop.type }}</code>
                      </td>
                      <td class="py-3">
                        <code v-if="prop.default" class="text-warning-400 text-xs font-mono">{{ prop.default }}</code>
                        <span v-else class="text-text-muted">—</span>
                      </td>
                      <td class="py-3">
                        <span
                          class="px-2 py-0.5 rounded-md text-xs border"
                          :class="prop.required ? 'bg-danger-500/10 text-danger-400 border-danger-500/15' : 'bg-surface-700/30 text-text-muted border-border/50'"
                        >
                          {{ prop.required ? 'Yes' : 'No' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>

          <!-- Accessibility Tab -->
          <template #accessibility>
            <div class="p-5 space-y-6">
              <div class="flex items-center gap-3 p-4 bg-success-500/8 border border-success-500/15 rounded-xl">
                <Accessibility class="w-5 h-5 text-success-400" />
                <div>
                  <p class="font-display font-semibold text-text-primary text-sm">WCAG {{ component.accessibility.wcagLevel }} Compliant</p>
                  <p class="text-xs text-text-muted mt-0.5">Meets accessibility guidelines</p>
                </div>
              </div>

              <div>
                <h3 class="font-display font-semibold text-text-primary mb-3 text-sm tracking-tight">Keyboard Navigation</h3>
                <ul class="space-y-2.5">
                  <li
                    v-for="(item, index) in component.accessibility.keyboardNav"
                    :key="index"
                    class="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <kbd class="px-2 py-0.5 bg-surface-700/50 border border-border rounded-md text-[10px] text-text-muted font-mono mt-0.5">⌨</kbd>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="h-px bg-border"></div>

              <div>
                <h3 class="font-display font-semibold text-text-primary mb-3 text-sm tracking-tight">Screen Reader</h3>
                <ul class="space-y-2.5">
                  <li
                    v-for="(item, index) in component.accessibility.screenReader"
                    :key="index"
                    class="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span class="w-1 h-1 rounded-full bg-accent-400 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <!-- Code Tab -->
          <template #code>
            <div class="p-5 space-y-4">
              <!-- Platform Selector -->
              <div class="flex gap-2">
                <button
                  v-for="snippet in component.codeSnippets"
                  :key="snippet.platform"
                  @click="activeCodePlatform = snippet.platform"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border"
                  :class="[
                    activeCodePlatform === snippet.platform
                      ? 'bg-accent-500/15 text-accent-400 border-accent-500/25'
                      : 'bg-surface-700/30 text-text-muted hover:text-text-primary border-border/50'
                  ]"
                >
                  <Monitor v-if="snippet.platform === 'web'" class="w-4 h-4" />
                  <Smartphone v-else class="w-4 h-4" />
                  {{ snippet.platform.toUpperCase() }}
                </button>
              </div>

              <!-- Code Block -->
              <div class="relative">
                <button
                  @click="copyCode"
                  class="absolute top-3 right-3 p-2 rounded-xl bg-surface-700/50 hover:bg-surface-600/50 text-text-muted hover:text-text-primary transition-all border border-border/50"
                >
                  <Check v-if="copiedCode" class="w-4 h-4 text-success-400" />
                  <Copy v-else class="w-4 h-4" />
                </button>
                <pre class="p-4 bg-surface-950 border border-border rounded-xl overflow-x-auto text-sm"><code class="text-text-secondary font-mono">{{ component.codeSnippets.find(s => s.platform === activeCodePlatform)?.code }}</code></pre>
              </div>
            </div>
          </template>

          <!-- Lifecycle Tab -->
          <template #lifecycle>
            <div class="p-5 space-y-5">
              <div v-if="lifecycle">
                <!-- Pipeline -->
                <div class="flex items-center justify-between mb-6">
                  <div
                    v-for="(stage, index) in lifecycle.stages"
                    :key="stage.id"
                    class="flex-1 flex items-center"
                  >
                    <div class="flex flex-col items-center w-full">
                      <div 
                        class="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                        :class="getStatusConfig(stage.status).bg"
                      >
                        <component 
                          :is="getStageConfig(stage.type).icon" 
                          class="w-5 h-5"
                          :class="stage.status === 'completed' ? 'text-success-400' : getStageConfig(stage.type).color"
                        />
                      </div>
                      <span class="text-[10px] font-medium text-text-muted capitalize">{{ stage.type }}</span>
                      <span 
                        class="text-[9px] mt-0.5"
                        :class="getStatusConfig(stage.status).text"
                      >
                        {{ stage.status.replace('_', ' ') }}
                      </span>
                    </div>
                    <div 
                      v-if="index < lifecycle.stages.length - 1"
                      class="flex-1 h-0.5 mx-2"
                      :class="stage.status === 'completed' ? 'bg-success-500/30' : 'bg-border'"
                    ></div>
                  </div>
                </div>

                <!-- Stage Details -->
                <div class="space-y-3">
                  <div
                    v-for="stage in lifecycle.stages"
                    :key="stage.id"
                    class="p-4 bg-surface-700/30 border border-border/50 rounded-xl"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-3">
                        <component 
                          :is="getStageConfig(stage.type).icon" 
                          class="w-4 h-4"
                          :class="getStageConfig(stage.type).color"
                        />
                        <div>
                          <p class="text-sm font-medium text-text-primary capitalize">{{ stage.type }}</p>
                          <p v-if="stage.assignee" class="text-xs text-text-muted">{{ stage.assignee.name }}</p>
                        </div>
                      </div>
                      <span 
                        class="px-2 py-0.5 text-[10px] font-medium rounded"
                        :class="[getStatusConfig(stage.status).bg, getStatusConfig(stage.status).text]"
                      >
                        {{ stage.status.replace('_', ' ') }}
                      </span>
                    </div>
                    <p v-if="stage.notes" class="text-xs text-text-muted mt-2">{{ stage.notes }}</p>
                    <div v-if="stage.artifacts.length" class="flex gap-2 mt-3">
                      <a
                        v-for="artifact in stage.artifacts"
                        :key="artifact.url"
                        :href="artifact.url"
                        target="_blank"
                        class="px-2 py-1 text-[10px] bg-accent-500/10 text-accent-400 rounded-lg border border-accent-500/20 hover:bg-accent-500/20"
                      >
                        {{ artifact.label }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-10 text-text-muted text-sm">
                No lifecycle data available for this component
              </div>

              <!-- Branches & Contributions -->
              <div v-if="componentBranches.length || pendingContributions.length" class="pt-4 border-t border-border">
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Active Development</h3>
                <div class="space-y-2">
                  <div
                    v-for="contrib in pendingContributions"
                    :key="contrib.id"
                    class="flex items-center justify-between p-3 bg-surface-700/30 rounded-xl border border-border/50"
                  >
                    <div class="flex items-center gap-2">
                      <GitPullRequest class="w-4 h-4 text-warning-400" />
                      <span class="text-sm text-text-primary">{{ contrib.title }}</span>
                    </div>
                    <span class="text-xs text-text-muted">{{ contrib.status.replace('_', ' ') }}</span>
                  </div>
                </div>
              </div>

              <!-- Open Issues -->
              <div v-if="openIssues.length" class="pt-4 border-t border-border">
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Open Issues ({{ openIssues.length }})</h3>
                <div class="space-y-2">
                  <div
                    v-for="issue in openIssues.slice(0, 3)"
                    :key="issue.id"
                    class="flex items-center justify-between p-3 bg-surface-700/30 rounded-xl border border-border/50"
                  >
                    <div class="flex items-center gap-2">
                      <Bug class="w-4 h-4" :class="issue.type === 'bug' ? 'text-danger-400' : 'text-accent-400'" />
                      <span class="text-sm text-text-primary line-clamp-1">{{ issue.title }}</span>
                    </div>
                    <span 
                      class="px-2 py-0.5 text-[10px] font-medium rounded"
                      :class="issue.priority === 'critical' ? 'bg-danger-500/10 text-danger-400' : 'bg-surface-700/50 text-text-muted'"
                    >
                      {{ issue.priority }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- AI Context Tab -->
          <template #ai>
            <div class="p-5 space-y-5">
              <div v-if="aiMetadata">
                <!-- Summary -->
                <div class="p-4 bg-accent-500/5 border border-accent-500/15 rounded-xl">
                  <h3 class="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-2">AI Summary</h3>
                  <p class="text-sm text-text-secondary leading-relaxed">{{ aiMetadata.summary }}</p>
                </div>

                <!-- Keywords -->
                <div>
                  <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Keywords</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="keyword in aiMetadata.keywords" 
                      :key="keyword"
                      class="px-2.5 py-1 text-xs bg-surface-700/50 text-text-secondary rounded-lg border border-border/50"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                </div>

                <!-- Use Cases -->
                <div>
                  <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Use Cases</h3>
                  <ul class="space-y-1.5">
                    <li 
                      v-for="useCase in aiMetadata.useCases" 
                      :key="useCase"
                      class="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircle2 class="w-3.5 h-3.5 text-success-400" />
                      {{ useCase }}
                    </li>
                  </ul>
                </div>

                <!-- Code Patterns -->
                <div>
                  <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Code Patterns</h3>
                  <div class="space-y-2">
                    <pre 
                      v-for="(pattern, i) in aiMetadata.codePatterns" 
                      :key="i"
                      class="p-3 bg-surface-950 border border-border rounded-lg text-xs font-mono text-text-secondary overflow-x-auto"
                    >{{ pattern }}</pre>
                  </div>
                </div>

                <!-- Constraints -->
                <div>
                  <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Constraints</h3>
                  <ul class="space-y-1.5">
                    <li 
                      v-for="constraint in aiMetadata.constraints" 
                      :key="constraint"
                      class="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <AlertCircle class="w-3.5 h-3.5 text-warning-400" />
                      {{ constraint }}
                    </li>
                  </ul>
                </div>

                <!-- Related Components -->
                <div v-if="aiMetadata.relatedComponents.length">
                  <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Related Components</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="related in aiMetadata.relatedComponents" 
                      :key="related"
                      class="px-2.5 py-1 text-xs bg-accent-500/10 text-accent-400 rounded-lg border border-accent-500/20"
                    >
                      {{ related }}
                    </span>
                  </div>
                </div>

                <!-- Export JSON -->
                <div class="pt-4 border-t border-border">
                  <button 
                    class="w-full p-3 text-xs font-medium text-text-muted border border-border rounded-xl hover:bg-surface-700/50 transition-colors"
                    @click="copyAIMetadata"
                  >
                    Copy AI Metadata as JSON
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-10 text-text-muted text-sm">
                No AI metadata available for this component
              </div>
            </div>
          </template>
        </TabsPanel>
      </div>
    </div>

    <!-- Version History -->
    <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
      <h2 class="font-display font-semibold text-text-primary mb-5 flex items-center gap-2.5 text-sm tracking-tight">
        <Clock class="w-4 h-4 text-text-muted" />
        Version History
      </h2>
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
        <div class="space-y-5">
          <div
            v-for="(version, index) in component.versions"
            :key="version.version"
            class="relative pl-10"
          >
            <div
              class="absolute left-2.5 w-3 h-3 rounded-full border-2"
              :class="index === 0 ? 'bg-accent-500 border-accent-500 shadow-sm shadow-accent-500/30' : 'bg-surface-700 border-surface-500'"
            ></div>
            <div class="bg-surface-700/30 border border-border/50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-display font-semibold text-text-primary text-sm">v{{ version.version }}</span>
                <span class="text-xs text-text-muted font-mono">{{ formatDate(version.date) }}</span>
              </div>
              <ul class="space-y-1.5 mb-2">
                <li
                  v-for="(change, i) in version.changes"
                  :key="i"
                  class="text-sm text-text-secondary flex items-start gap-2"
                >
                  <span class="text-accent-400 mt-0.5">•</span>
                  {{ change }}
                </li>
              </ul>
              <p class="text-[10px] text-text-muted uppercase tracking-[0.1em]">by {{ version.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
      <h2 class="font-display font-semibold text-text-primary mb-5 flex items-center gap-2.5 text-sm tracking-tight">
        <MessageSquare class="w-4 h-4 text-text-muted" />
        Team Feedback
        <span class="text-xs font-normal text-text-muted font-mono">({{ component.comments.length }})</span>
      </h2>

      <!-- Comment Input -->
      <div class="flex gap-3 mb-6">
        <img
          src="https://i.pravatar.cc/40?img=25"
          alt="You"
          class="w-9 h-9 rounded-xl object-cover"
        />
        <div class="flex-1 relative">
          <input
            v-model="newComment"
            type="text"
            placeholder="Add a comment..."
            class="w-full px-4 py-3 pr-12 bg-surface-800/60 border border-border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 transition-colors"
          />
          <button 
            @click="sendComment"
            :disabled="!newComment.trim()"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-accent-400 hover:text-accent-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check v-if="commentSent" class="w-4 h-4 text-success-400" />
            <Send v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-3">
        <div
          v-for="comment in component.comments"
          :key="comment.id"
          class="bg-surface-700/30 border border-border/50 rounded-xl p-4"
        >
          <div class="flex items-start gap-3">
            <img
              :src="comment.author.avatar"
              :alt="comment.author.name"
              class="w-8 h-8 rounded-xl object-cover"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="font-medium text-text-primary text-sm">{{ comment.author.name }}</span>
                <span class="text-[10px] text-text-muted font-mono">{{ formatDate(comment.date) }}</span>
              </div>
              <p class="text-sm text-text-secondary leading-relaxed">{{ comment.content }}</p>

              <!-- Replies -->
              <div v-if="comment.replies?.length" class="mt-4 space-y-3 pl-4 border-l border-accent-500/15">
                <div
                  v-for="reply in comment.replies"
                  :key="reply.id"
                  class="flex items-start gap-3"
                >
                  <img
                    :src="reply.author.avatar"
                    :alt="reply.author.name"
                    class="w-6 h-6 rounded-lg object-cover"
                  />
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-text-primary text-xs">{{ reply.author.name }}</span>
                      <span class="text-[10px] text-text-muted font-mono">{{ formatDate(reply.date) }}</span>
                    </div>
                    <p class="text-sm text-text-secondary leading-relaxed">{{ reply.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex items-center justify-center py-20">
    <div class="text-center">
      <div class="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-xl animate-spin mx-auto mb-4"></div>
      <p class="text-sm text-text-muted">Loading component...</p>
    </div>
  </div>
</template>
