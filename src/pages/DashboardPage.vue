<script setup lang="ts">
import { computed } from 'vue'
import { useComponentsStore } from '@/stores/components'
import ComponentCard from '@/components/common/ComponentCard.vue'
import MetricCard from '@/components/common/MetricCard.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import { Box, Percent, AlertCircle, CheckCircle, TrendingUp } from 'lucide-vue-next'

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
</script>

<template>
  <div class="space-y-7">
    <!-- Stats Overview with Staggered Animation -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Components"
        :value="store.stats.total"
        :icon="Box"
        color="primary"
        :trend="12"
        class="animate-fade-up stagger-1"
      />
      <MetricCard
        title="Coverage"
        :value="`${store.stats.coverage}%`"
        :icon="Percent"
        color="success"
        :trend="5"
        class="animate-fade-up stagger-2"
      />
      <MetricCard
        title="Open Issues"
        :value="store.stats.openIssues"
        :icon="AlertCircle"
        color="warning"
        :trend="-8"
        class="animate-fade-up stagger-3"
      />
      <MetricCard
        title="Stable"
        :value="store.stats.stable"
        subtitle="Components ready for production"
        :icon="CheckCircle"
        color="success"
        class="animate-fade-up stagger-4"
      />
    </div>

    <!-- Filters Section -->
    <div class="bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up stagger-5">
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
            class="px-4 py-2 text-xs font-medium text-danger-400 hover:bg-danger-500/10 rounded-xl transition-all border border-transparent hover:border-danger-500/15"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Results Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-display font-semibold text-text-primary tracking-tight">
          Components
          <span class="text-text-muted font-sans font-normal ml-2 text-sm">
            ({{ store.filteredComponents.length }})
          </span>
        </h2>
        <p v-if="hasActiveFilters" class="text-xs text-text-muted mt-1">
          Filtered from {{ store.stats.total }} total components
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="hidden md:flex items-center gap-5 text-xs">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-success-500"></span>
          <span class="text-text-muted font-mono">{{ store.stats.stable }} Stable</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-warning-500"></span>
          <span class="text-text-muted font-mono">{{ store.stats.beta }} Beta</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-danger-500"></span>
          <span class="text-text-muted font-mono">{{ store.stats.deprecated }} Deprecated</span>
        </div>
      </div>
    </div>

    <!-- Components Grid with Animated Transitions -->
    <div
      v-if="store.filteredComponents.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <ComponentCard
        v-for="(component, index) in store.filteredComponents"
        :key="component.id"
        :component="component"
        :style="{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }"
        class="animate-fade-up"
      />
    </div>

    <!-- Empty State with Animation -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-20 text-center animate-fade-up"
    >
      <div class="w-16 h-16 rounded-2xl bg-surface-700/50 flex items-center justify-center mb-5 border border-border animate-float">
        <Box class="w-7 h-7 text-text-muted" />
      </div>
      <h3 class="text-lg font-display font-semibold text-text-primary mb-2">No components found</h3>
      <p class="text-sm text-text-muted max-w-md mb-6">
        Try adjusting your filters or search query to find what you're looking for.
      </p>
      <button
        @click="store.clearFilters()"
        class="px-5 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
      >
        Clear Filters
      </button>
    </div>

    <!-- Needs Update Section with Animation -->
    <div v-if="store.stats.needsUpdate > 0 && !hasActiveFilters" class="mt-4 animate-fade-up stagger-6">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2 rounded-xl bg-warning-500/10 border border-warning-500/10 animate-glow-pulse">
          <TrendingUp class="w-4 h-4 text-warning-400" />
        </div>
        <div>
          <h3 class="font-semibold text-text-primary text-sm">Updates Available</h3>
          <p class="text-xs text-text-muted">{{ store.stats.needsUpdate }} components have pending updates</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComponentCard
          v-for="(component, index) in store.components.filter(c => c.needsUpdate).slice(0, 4)"
          :key="component.id"
          :component="component"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="animate-fade-up"
        />
      </div>
    </div>
  </div>
</template>
