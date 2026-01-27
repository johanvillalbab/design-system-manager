<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useComponentsStore } from '@/stores/components'
import ComponentCard from '@/components/common/ComponentCard.vue'
import MetricCard from '@/components/common/MetricCard.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import { Box, Percent, AlertCircle, CheckCircle, TrendingUp, RefreshCw, Database, Cloud, Star } from 'lucide-vue-next'

const store = useComponentsStore()

const platformOptions = [
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
  { id: 'web', label: 'Web' }
]

const statusOptions = [
  { id: 'stable', label: 'Stable' },
  { id: 'beta', label: 'Beta' },
  { id: 'deprecated', label: 'Deprecated' }
]

const categoryOptions = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'components', label: 'Components' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'templates', label: 'Templates' }
]

const hasActiveFilters = computed(() => {
  return store.filters.platforms.length > 0 || 
         store.filters.categories.length > 0 || 
         store.filters.statuses.length > 0 ||
         store.filters.search.length > 0
})

// Fetch data from API on mount
onMounted(async () => {
  await store.fetchComponents()
})

// Toggle between API and mock data
function toggleDataSource() {
  if (store.dataSource === 'api') {
    store.useMockData()
  } else {
    store.fetchComponents()
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Data Source Toggle & Status -->
    <div class="flex items-center justify-between bg-surface-800 border border-border rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div 
          class="p-2 rounded-lg"
          :class="store.dataSource === 'api' ? 'bg-primary-500/10' : 'bg-surface-700'"
        >
          <Cloud v-if="store.dataSource === 'api'" class="w-5 h-5 text-primary-500" />
          <Database v-else class="w-5 h-5 text-text-muted" />
        </div>
        <div>
          <p class="text-sm font-medium text-text-primary">
            {{ store.dataSource === 'api' ? 'Ant Design (GitHub API)' : 'Mock Data' }}
          </p>
          <p class="text-xs text-text-muted">
            {{ store.dataSource === 'api' ? 'Real-time data from ant-design/ant-design' : 'Using local sample data' }}
          </p>
        </div>
        <div v-if="store.dataSource === 'api' && store.stats.stars" class="flex items-center gap-1 ml-4 px-2 py-1 bg-warning-500/10 rounded-md">
          <Star class="w-4 h-4 text-warning-500" />
          <span class="text-sm font-medium text-warning-500">{{ store.stats.stars.toLocaleString() }}</span>
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
          {{ store.dataSource === 'api' ? 'Use Mock Data' : 'Load from API' }}
        </button>
      </div>
    </div>

    <!-- Error Alert -->
    <div 
      v-if="store.error" 
      class="bg-danger-500/10 border border-danger-500/20 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertCircle class="w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-medium text-danger-500">Error loading data</p>
        <p class="text-sm text-danger-400 mt-1">{{ store.error }}</p>
        <p class="text-xs text-text-muted mt-2">Showing fallback mock data instead.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <RefreshCw class="w-8 h-8 text-primary-500 animate-spin" />
        <p class="text-text-secondary">Loading components from GitHub...</p>
      </div>
    </div>

    <!-- Main Content (hidden while loading) -->
    <template v-else>
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Components"
          :value="store.stats.total"
          :icon="Box"
          color="primary"
          :trend="12"
        />
        <MetricCard 
          title="Coverage"
          :value="`${store.stats.coverage}%`"
          :icon="Percent"
          color="success"
          :trend="5"
        />
        <MetricCard 
          title="Open Issues"
          :value="store.stats.openIssues"
          :icon="AlertCircle"
          color="warning"
          :trend="-8"
        />
        <MetricCard 
          title="Stable"
          :value="store.stats.stable"
          subtitle="Components ready for production"
          :icon="CheckCircle"
          color="success"
        />
      </div>

      <!-- Filters Section -->
      <div class="bg-surface-800 border border-border rounded-2xl p-5">
        <div class="flex flex-col lg:flex-row lg:items-start gap-6">
          <!-- Platform Filter -->
          <FilterChips
            :options="platformOptions"
            :selected="store.filters.platforms"
            label="Platform"
            @toggle="(id) => store.togglePlatform(id as any)"
            @clear="() => store.filters.platforms = []"
          />

          <!-- Status Filter -->
          <FilterChips
            :options="statusOptions"
            :selected="store.filters.statuses"
            label="Status"
            @toggle="(id) => store.toggleStatus(id as any)"
            @clear="() => store.filters.statuses = []"
          />

          <!-- Category Filter -->
          <FilterChips
            :options="categoryOptions"
            :selected="store.filters.categories"
            label="Category"
            @toggle="(id) => store.toggleCategory(id as any)"
            @clear="() => store.filters.categories = []"
          />

          <!-- Clear All -->
          <div v-if="hasActiveFilters" class="lg:ml-auto lg:self-end">
            <button
              @click="store.clearFilters()"
              class="px-4 py-2 text-sm font-medium text-danger-500 hover:bg-danger-500/10 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-text-primary">
            Components
            <span class="text-text-muted font-normal ml-2">
              ({{ store.filteredComponents.length }})
            </span>
          </h2>
          <p v-if="hasActiveFilters" class="text-sm text-text-muted mt-1">
            Filtered from {{ store.stats.total }} total components
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="hidden md:flex items-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-success-500"></span>
            <span class="text-text-secondary">{{ store.stats.stable }} Stable</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-warning-500"></span>
            <span class="text-text-secondary">{{ store.stats.beta }} Beta</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-danger-500"></span>
            <span class="text-text-secondary">{{ store.stats.deprecated }} Deprecated</span>
          </div>
        </div>
      </div>

      <!-- Components Grid -->
      <div 
        v-if="store.filteredComponents.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <ComponentCard 
          v-for="component in store.filteredComponents"
          :key="component.id"
          :component="component"
        />
      </div>

      <!-- Empty State -->
      <div 
        v-else
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-16 h-16 rounded-2xl bg-surface-700 flex items-center justify-center mb-4">
          <Box class="w-8 h-8 text-text-muted" />
        </div>
        <h3 class="text-lg font-semibold text-text-primary mb-2">No components found</h3>
        <p class="text-text-secondary max-w-md mb-6">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
        <button
          @click="store.clearFilters()"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <!-- Needs Update Section -->
      <div v-if="store.stats.needsUpdate > 0 && !hasActiveFilters" class="mt-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 rounded-lg bg-warning-500/10">
            <TrendingUp class="w-5 h-5 text-warning-500" />
          </div>
          <div>
            <h3 class="font-semibold text-text-primary">Updates Available</h3>
            <p class="text-sm text-text-muted">{{ store.stats.needsUpdate }} components have pending updates</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ComponentCard 
            v-for="component in store.components.filter(c => c.needsUpdate).slice(0, 4)"
            :key="component.id"
            :component="component"
          />
        </div>
      </div>
    </template>
  </div>
</template>
