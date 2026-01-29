<script setup lang="ts">
import { ref, computed } from 'vue'
import { useComponentsStore } from '@/stores/components'
import { mockAIMetadata } from '@/data/lifecycle'
import {
  Search,
  FileText,
  Code2,
  Cpu,
  Download,
  ChevronRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  BookOpen,
  Layers
} from 'lucide-vue-next'

const componentsStore = useComponentsStore()

const searchQuery = ref('')
const selectedComponent = ref<string | null>(null)
const copiedJson = ref(false)

// Get all components with AI metadata
const documentedComponents = computed(() => {
  return componentsStore.components.filter(c => mockAIMetadata[c.id])
})

const filteredComponents = computed(() => {
  if (!searchQuery.value) return documentedComponents.value
  
  const query = searchQuery.value.toLowerCase()
  return documentedComponents.value.filter(component => {
    const metadata = mockAIMetadata[component.id]
    if (!metadata) return false
    
    // Search in component name
    if (component.name.toLowerCase().includes(query)) return true
    
    // Search in keywords
    if (metadata.keywords.some(k => k.toLowerCase().includes(query))) return true
    
    // Search in use cases
    if (metadata.useCases.some(u => u.toLowerCase().includes(query))) return true
    
    // Search in summary
    if (metadata.summary.toLowerCase().includes(query)) return true
    
    return false
  })
})

const selectedMetadata = computed(() => {
  if (!selectedComponent.value) return null
  return mockAIMetadata[selectedComponent.value]
})

const selectedComponentData = computed(() => {
  if (!selectedComponent.value) return null
  return componentsStore.components.find(c => c.id === selectedComponent.value)
})

// All unique keywords across all components
const allKeywords = computed(() => {
  const keywords = new Set<string>()
  Object.values(mockAIMetadata).forEach(meta => {
    meta.keywords.forEach(k => keywords.add(k))
  })
  return Array.from(keywords).sort()
})

function selectComponent(componentId: string) {
  selectedComponent.value = componentId
}

function copyAllMetadata() {
  const allData = Object.entries(mockAIMetadata).map(([id, meta]) => {
    const component = componentsStore.components.find(c => c.id === id)
    return {
      componentId: id,
      componentName: component?.name,
      ...meta
    }
  })
  navigator.clipboard.writeText(JSON.stringify(allData, null, 2))
  copiedJson.value = true
  setTimeout(() => copiedJson.value = false, 2000)
}

function copyComponentMetadata() {
  if (!selectedMetadata.value || !selectedComponentData.value) return
  const data = {
    componentId: selectedComponent.value,
    componentName: selectedComponentData.value.name,
    ...selectedMetadata.value
  }
  navigator.clipboard.writeText(JSON.stringify(data, null, 2))
}
</script>

<template>
  <div class="space-y-7">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up">
      <div>
        <h1 class="text-xl font-display font-semibold text-text-primary tracking-tight">Documentation Hub</h1>
        <p class="text-sm text-text-muted mt-1">Hybrid documentation for humans and AI systems</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="copyAllMetadata"
          class="flex items-center gap-2 px-4 py-2.5 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border"
        >
          <Check v-if="copiedJson" class="w-4 h-4 text-success-400" />
          <Download v-else class="w-4 h-4" />
          Export All AI Context
        </button>
      </div>
    </div>

    <!-- Search & Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="lg:col-span-2 bg-surface-800/40 border border-border rounded-2xl p-4 animate-fade-up stagger-1">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by keyword, use case, or component name..."
            class="w-full pl-10 pr-4 py-3 bg-surface-700/50 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40"
          />
        </div>
      </div>

      <!-- Stats -->
      <div class="bg-surface-800/40 border border-border rounded-2xl p-4 flex items-center gap-4 animate-fade-up stagger-2">
        <div class="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
          <FileText class="w-5 h-5 text-accent-400" />
        </div>
        <div>
          <p class="text-2xl font-semibold text-text-primary">{{ documentedComponents.length }}</p>
          <p class="text-xs text-text-muted">Documented Components</p>
        </div>
      </div>

      <div class="bg-surface-800/40 border border-border rounded-2xl p-4 flex items-center gap-4 animate-fade-up stagger-3">
        <div class="w-10 h-10 rounded-xl bg-success-500/10 flex items-center justify-center">
          <Tag class="w-5 h-5 text-success-400" />
        </div>
        <div>
          <p class="text-2xl font-semibold text-text-primary">{{ allKeywords.length }}</p>
          <p class="text-xs text-text-muted">Unique Keywords</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Components List -->
      <div class="space-y-3">
        <h2 class="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">Components</h2>
        <div class="space-y-2">
          <div
            v-for="component in filteredComponents"
            :key="component.id"
            @click="selectComponent(component.id)"
            class="p-4 bg-surface-800/40 border rounded-xl cursor-pointer transition-all"
            :class="[
              selectedComponent === component.id 
                ? 'border-accent-500/30 bg-surface-800/70' 
                : 'border-border hover:border-accent-500/20 hover:bg-surface-800/60'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-surface-700/50 flex items-center justify-center">
                  <Layers class="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <p class="text-sm font-medium text-text-primary">{{ component.name }}</p>
                  <p class="text-[10px] text-text-muted">{{ mockAIMetadata[component.id]?.keywords.slice(0, 3).join(', ') }}</p>
                </div>
              </div>
              <ChevronRight class="w-4 h-4 text-text-muted" />
            </div>
          </div>
        </div>

        <div v-if="filteredComponents.length === 0" class="text-center py-10 text-text-muted text-sm">
          No components match your search
        </div>
      </div>

      <!-- Detail View -->
      <div class="lg:col-span-2">
        <div v-if="selectedMetadata && selectedComponentData" class="bg-surface-800/40 border border-border rounded-2xl overflow-hidden">
          <!-- Header -->
          <div class="p-5 border-b border-border">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-text-primary">{{ selectedComponentData.name }}</h2>
                <p class="text-xs text-text-muted mt-1">AI Context for {{ selectedComponentData.name }}</p>
              </div>
              <button
                @click="copyComponentMetadata"
                class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted transition-colors"
                title="Copy JSON"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 space-y-6">
            <!-- Summary -->
            <div class="p-4 bg-accent-500/5 border border-accent-500/15 rounded-xl">
              <div class="flex items-center gap-2 mb-2">
                <Cpu class="w-4 h-4 text-accent-400" />
                <h3 class="text-xs font-semibold text-accent-400 uppercase tracking-wider">AI Summary</h3>
              </div>
              <p class="text-sm text-text-secondary leading-relaxed">{{ selectedMetadata.summary }}</p>
            </div>

            <!-- Two Column Layout -->
            <div class="grid grid-cols-2 gap-6">
              <!-- Keywords -->
              <div>
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Keywords</h3>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="keyword in selectedMetadata.keywords" 
                    :key="keyword"
                    class="px-2 py-1 text-[10px] bg-surface-700/50 text-text-secondary rounded-md border border-border/50"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </div>

              <!-- Related -->
              <div>
                <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Related Components</h3>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="related in selectedMetadata.relatedComponents" 
                    :key="related"
                    class="px-2 py-1 text-[10px] bg-accent-500/10 text-accent-400 rounded-md border border-accent-500/20"
                  >
                    {{ related }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Use Cases -->
            <div>
              <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Use Cases</h3>
              <div class="grid grid-cols-2 gap-2">
                <div 
                  v-for="useCase in selectedMetadata.useCases" 
                  :key="useCase"
                  class="flex items-center gap-2 p-2.5 bg-surface-700/30 rounded-lg border border-border/50"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-success-400 flex-shrink-0" />
                  <span class="text-xs text-text-secondary">{{ useCase }}</span>
                </div>
              </div>
            </div>

            <!-- Code Patterns -->
            <div>
              <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Code Patterns</h3>
              <div class="space-y-2">
                <pre 
                  v-for="(pattern, i) in selectedMetadata.codePatterns" 
                  :key="i"
                  class="p-3 bg-surface-950 border border-border rounded-lg text-[11px] font-mono text-text-secondary overflow-x-auto"
                >{{ pattern }}</pre>
              </div>
            </div>

            <!-- Constraints -->
            <div>
              <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Constraints & Rules</h3>
              <div class="space-y-2">
                <div 
                  v-for="constraint in selectedMetadata.constraints" 
                  :key="constraint"
                  class="flex items-start gap-2 p-2.5 bg-warning-500/5 rounded-lg border border-warning-500/10"
                >
                  <AlertCircle class="w-3.5 h-3.5 text-warning-400 flex-shrink-0 mt-0.5" />
                  <span class="text-xs text-text-secondary">{{ constraint }}</span>
                </div>
              </div>
            </div>

            <!-- Raw JSON Preview -->
            <div class="pt-4 border-t border-border">
              <details class="group">
                <summary class="text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-secondary">
                  Raw JSON (click to expand)
                </summary>
                <pre class="mt-3 p-4 bg-surface-950 border border-border rounded-xl text-[10px] font-mono text-text-muted overflow-x-auto max-h-60">{{ JSON.stringify(selectedMetadata, null, 2) }}</pre>
              </details>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-surface-800/40 border border-border rounded-2xl p-10 text-center">
          <div class="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mx-auto mb-5 border border-accent-500/15">
            <BookOpen class="w-7 h-7 text-accent-400" />
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Select a Component</h3>
          <p class="text-sm text-text-muted max-w-md mx-auto">
            Choose a component from the list to view its AI-readable documentation and metadata.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
