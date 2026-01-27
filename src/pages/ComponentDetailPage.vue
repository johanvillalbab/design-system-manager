<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '@/stores/components'
import StatusBadge from '@/components/common/StatusBadge.vue'
import PlatformBadge from '@/components/common/PlatformBadge.vue'
import TabsPanel from '@/components/ui/TabsPanel.vue'
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
  Send
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = useComponentsStore()

const activeVariant = ref('default')
const activeDocTab = ref('usage')
const activeCodePlatform = ref('web')
const copiedCode = ref(false)
const newComment = ref('')

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
  { id: 'code', label: 'Code', icon: Code2 }
]

onMounted(() => {
  const id = route.params.id as string
  store.loadComponent(id)
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    store.loadComponent(newId as string)
  }
})

function goBack() {
  router.push('/')
}

function copyCode() {
  const snippet = component.value?.codeSnippets.find(s => s.platform === activeCodePlatform.value)
  if (snippet) {
    navigator.clipboard.writeText(snippet.code)
    copiedCode.value = true
    setTimeout(() => copiedCode.value = false, 2000)
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
  <div v-if="component" class="space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <button 
          @click="goBack"
          class="p-2 rounded-lg hover:bg-surface-700 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-text-primary">{{ component.name }}</h1>
            <StatusBadge :status="component.status" />
          </div>
          <p class="text-text-secondary mt-1">v{{ component.version }} · Last updated {{ formatDate(component.lastUpdated) }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <PlatformBadge v-for="p in component.platforms" :key="p" :platform="p" />
        </div>
        <button class="p-2.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-text-secondary hover:text-text-primary transition-colors">
          <ExternalLink class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Main Content - Split View -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left: Preview -->
      <div class="space-y-6">
        <!-- Interactive Preview -->
        <div class="bg-surface-800 border border-border rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-border">
            <h2 class="font-semibold text-text-primary">Interactive Preview</h2>
          </div>
          
          <!-- Variant Tabs -->
          <div class="flex gap-1 p-2 bg-surface-900/50 border-b border-border">
            <button
              v-for="variant in component.variants"
              :key="variant.id"
              @click="activeVariant = variant.id"
              class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
              :class="[
                activeVariant === variant.id
                  ? 'bg-primary-600 text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
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
                'bg-primary-600 hover:bg-primary-500 text-white': propsState.variant === 'primary',
                'bg-surface-700 hover:bg-surface-600 text-text-primary border border-border': propsState.variant === 'secondary',
                'bg-transparent hover:bg-surface-700 text-text-secondary': propsState.variant === 'ghost',
                'bg-danger-600 hover:bg-danger-500 text-white': propsState.variant === 'danger',
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
            <h3 class="text-sm font-medium text-text-secondary">Adjust Props</h3>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Variant -->
              <div>
                <label class="text-xs text-text-muted mb-1.5 block">Variant</label>
                <select 
                  v-model="propsState.variant"
                  class="w-full px-3 py-2 bg-surface-700 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-primary-500"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="ghost">Ghost</option>
                  <option value="danger">Danger</option>
                </select>
              </div>

              <!-- Size -->
              <div>
                <label class="text-xs text-text-muted mb-1.5 block">Size</label>
                <select 
                  v-model="propsState.size"
                  class="w-full px-3 py-2 bg-surface-700 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-primary-500"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <!-- Disabled -->
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="propsState.disabled"
                  class="w-4 h-4 rounded border-border bg-surface-700 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm text-text-secondary">Disabled</span>
              </label>

              <!-- Loading -->
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="propsState.loading"
                  class="w-4 h-4 rounded border-border bg-surface-700 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm text-text-secondary">Loading</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Documentation -->
      <div class="bg-surface-800 border border-border rounded-2xl overflow-hidden">
        <TabsPanel :tabs="docTabs" v-model="activeDocTab">
          <!-- Usage Tab -->
          <template #usage>
            <div class="p-4 space-y-6">
              <div>
                <h3 class="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Check class="w-5 h-5 text-success-500" />
                  When to use
                </h3>
                <ul class="space-y-2">
                  <li 
                    v-for="(item, index) in component.usage.doList" 
                    :key="index"
                    class="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-success-500 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span class="w-5 h-5 flex items-center justify-center text-danger-500 font-bold">×</span>
                  When not to use
                </h3>
                <ul class="space-y-2">
                  <li 
                    v-for="(item, index) in component.usage.dontList" 
                    :key="index"
                    class="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-danger-500 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <!-- Anatomy Tab -->
          <template #anatomy>
            <div class="p-4">
              <div class="aspect-video bg-surface-700 rounded-xl flex items-center justify-center">
                <p class="text-text-muted">Component anatomy diagram</p>
              </div>
              <div class="mt-4 space-y-2">
                <div class="flex items-center gap-3 p-3 bg-surface-700 rounded-lg">
                  <span class="w-6 h-6 rounded bg-primary-600 flex items-center justify-center text-xs font-bold text-white">1</span>
                  <div>
                    <p class="text-sm font-medium text-text-primary">Label</p>
                    <p class="text-xs text-text-muted">Primary text content</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-surface-700 rounded-lg">
                  <span class="w-6 h-6 rounded bg-primary-600 flex items-center justify-center text-xs font-bold text-white">2</span>
                  <div>
                    <p class="text-sm font-medium text-text-primary">Icon (optional)</p>
                    <p class="text-xs text-text-muted">Leading or trailing icon</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-surface-700 rounded-lg">
                  <span class="w-6 h-6 rounded bg-primary-600 flex items-center justify-center text-xs font-bold text-white">3</span>
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
            <div class="p-4">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left text-text-muted border-b border-border">
                      <th class="pb-3 font-medium">Name</th>
                      <th class="pb-3 font-medium">Type</th>
                      <th class="pb-3 font-medium">Default</th>
                      <th class="pb-3 font-medium">Required</th>
                    </tr>
                  </thead>
                  <tbody class="text-text-secondary">
                    <tr 
                      v-for="prop in component.props" 
                      :key="prop.name"
                      class="border-b border-border/50"
                    >
                      <td class="py-3">
                        <code class="text-primary-400 bg-primary-500/10 px-1.5 py-0.5 rounded">{{ prop.name }}</code>
                      </td>
                      <td class="py-3">
                        <code class="text-text-muted text-xs">{{ prop.type }}</code>
                      </td>
                      <td class="py-3">
                        <code v-if="prop.default" class="text-warning-500 text-xs">{{ prop.default }}</code>
                        <span v-else class="text-text-muted">-</span>
                      </td>
                      <td class="py-3">
                        <span 
                          class="px-2 py-0.5 rounded text-xs"
                          :class="prop.required ? 'bg-danger-500/15 text-danger-500' : 'bg-surface-600 text-text-muted'"
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
            <div class="p-4 space-y-6">
              <div class="flex items-center gap-3 p-4 bg-success-500/10 border border-success-500/30 rounded-xl">
                <Accessibility class="w-6 h-6 text-success-500" />
                <div>
                  <p class="font-medium text-text-primary">WCAG {{ component.accessibility.wcagLevel }} Compliant</p>
                  <p class="text-sm text-text-secondary">Meets accessibility guidelines</p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-text-primary mb-3">Keyboard Navigation</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="(item, index) in component.accessibility.keyboardNav" 
                    :key="index"
                    class="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <kbd class="px-2 py-0.5 bg-surface-700 rounded text-xs text-text-muted">⌨️</kbd>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-text-primary mb-3">Screen Reader</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="(item, index) in component.accessibility.screenReader" 
                    :key="index"
                    class="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <!-- Code Tab -->
          <template #code>
            <div class="p-4 space-y-4">
              <!-- Platform Selector -->
              <div class="flex gap-2">
                <button
                  v-for="snippet in component.codeSnippets"
                  :key="snippet.platform"
                  @click="activeCodePlatform = snippet.platform"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  :class="[
                    activeCodePlatform === snippet.platform
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-700 text-text-secondary hover:text-text-primary'
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
                  class="absolute top-3 right-3 p-2 rounded-lg bg-surface-600 hover:bg-surface-500 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Check v-if="copiedCode" class="w-4 h-4 text-success-500" />
                  <Copy v-else class="w-4 h-4" />
                </button>
                <pre class="p-4 bg-surface-900 rounded-xl overflow-x-auto text-sm"><code class="text-text-secondary">{{ component.codeSnippets.find(s => s.platform === activeCodePlatform)?.code }}</code></pre>
              </div>
            </div>
          </template>
        </TabsPanel>
      </div>
    </div>

    <!-- Version History -->
    <div class="bg-surface-800 border border-border rounded-2xl p-5">
      <h2 class="font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Clock class="w-5 h-5 text-text-muted" />
        Version History
      </h2>
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-600"></div>
        <div class="space-y-6">
          <div 
            v-for="(version, index) in component.versions" 
            :key="version.version"
            class="relative pl-10"
          >
            <div 
              class="absolute left-2.5 w-3 h-3 rounded-full border-2"
              :class="index === 0 ? 'bg-primary-500 border-primary-500' : 'bg-surface-700 border-surface-500'"
            ></div>
            <div class="bg-surface-700/50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-text-primary">v{{ version.version }}</span>
                <span class="text-sm text-text-muted">{{ formatDate(version.date) }}</span>
              </div>
              <ul class="space-y-1 mb-2">
                <li 
                  v-for="(change, i) in version.changes" 
                  :key="i"
                  class="text-sm text-text-secondary flex items-start gap-2"
                >
                  <span class="text-primary-400">•</span>
                  {{ change }}
                </li>
              </ul>
              <p class="text-xs text-text-muted">by {{ version.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="bg-surface-800 border border-border rounded-2xl p-5">
      <h2 class="font-semibold text-text-primary mb-4 flex items-center gap-2">
        <MessageSquare class="w-5 h-5 text-text-muted" />
        Team Feedback
        <span class="text-sm font-normal text-text-muted">({{ component.comments.length }})</span>
      </h2>

      <!-- Comment Input -->
      <div class="flex gap-3 mb-6">
        <img 
          src="https://i.pravatar.cc/40?img=25" 
          alt="You"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-1 relative">
          <input
            v-model="newComment"
            type="text"
            placeholder="Add a comment..."
            class="w-full px-4 py-3 pr-12 bg-surface-700 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500"
          />
          <button class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-primary-400 hover:text-primary-300">
            <Send class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-4">
        <div 
          v-for="comment in component.comments" 
          :key="comment.id"
          class="bg-surface-700/50 rounded-xl p-4"
        >
          <div class="flex items-start gap-3">
            <img 
              :src="comment.avatar" 
              :alt="comment.author"
              class="w-9 h-9 rounded-full"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-text-primary">{{ comment.author }}</span>
                <span class="text-xs text-text-muted">{{ formatDate(comment.date) }}</span>
              </div>
              <p class="text-sm text-text-secondary">{{ comment.content }}</p>

              <!-- Replies -->
              <div v-if="comment.replies?.length" class="mt-4 space-y-3 pl-4 border-l-2 border-surface-600">
                <div 
                  v-for="reply in comment.replies" 
                  :key="reply.id"
                  class="flex items-start gap-3"
                >
                  <img 
                    :src="reply.avatar" 
                    :alt="reply.author"
                    class="w-7 h-7 rounded-full"
                  />
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-text-primary text-sm">{{ reply.author }}</span>
                      <span class="text-xs text-text-muted">{{ formatDate(reply.date) }}</span>
                    </div>
                    <p class="text-sm text-text-secondary">{{ reply.content }}</p>
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
      <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-text-muted">Loading component...</p>
    </div>
  </div>
</template>
