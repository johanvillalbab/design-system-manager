<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DesignComponent } from '@/types'
import StatusBadge from './StatusBadge.vue'
import PlatformBadge from './PlatformBadge.vue'
import { Clock, Users, ArrowUpRight } from 'lucide-vue-next'

const props = defineProps<{
  component: DesignComponent
}>()

const router = useRouter()

const statusColor = computed(() => {
  if (props.component.status === 'deprecated') return 'border-danger-500/30'
  if (props.component.needsUpdate) return 'border-warning-500/30'
  return 'border-success-500/20'
})

const glowColor = computed(() => {
  if (props.component.status === 'deprecated') return 'hover:shadow-danger-500/10'
  if (props.component.needsUpdate) return 'hover:shadow-warning-500/10'
  return 'hover:shadow-success-500/10'
})

function navigateToDetail() {
  router.push(`/component/${props.component.id}`)
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <article 
    @click="navigateToDetail"
    class="group bg-surface-800 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-surface-700/80 hover:shadow-xl hover:-translate-y-1"
    :class="[statusColor, glowColor]"
  >
    <!-- Preview Area -->
    <div class="aspect-video bg-surface-700 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
      <div class="text-4xl font-bold text-text-muted/30 select-none">
        {{ component.name.charAt(0) }}
      </div>
      
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors flex items-center justify-center">
        <ArrowUpRight class="w-6 h-6 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-3">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
            {{ component.name }}
          </h3>
          <p class="text-sm text-text-muted mt-0.5">v{{ component.version }}</p>
        </div>
        <StatusBadge :status="component.status" size="sm" />
      </div>

      <!-- Description -->
      <p class="text-sm text-text-secondary line-clamp-2">
        {{ component.description }}
      </p>

      <!-- Platforms -->
      <div class="flex flex-wrap gap-1.5">
        <PlatformBadge 
          v-for="platform in component.platforms" 
          :key="platform" 
          :platform="platform" 
        />
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-border">
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock class="w-3.5 h-3.5" />
          <span>{{ formatDate(component.lastUpdated) }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Users class="w-3.5 h-3.5" />
          <span>{{ component.usageCount.toLocaleString() }} instances</span>
        </div>
      </div>

      <!-- Update indicator -->
      <div 
        v-if="component.needsUpdate && component.status !== 'deprecated'"
        class="flex items-center gap-2 text-xs text-warning-500 bg-warning-500/10 px-3 py-2 rounded-lg"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse"></span>
        Update available
      </div>
    </div>
  </article>
</template>
