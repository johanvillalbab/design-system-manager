<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DesignComponent } from '@/types'
import StatusBadge from './StatusBadge.vue'
import PlatformBadge from './PlatformBadge.vue'
import { Clock, Users } from 'lucide-vue-next'

const props = defineProps<{
  component: DesignComponent
}>()

const router = useRouter()

const borderAccent = computed(() => {
  if (props.component.status === 'deprecated') return 'border-danger-500/15 hover:border-danger-500/25'
  if (props.component.needsUpdate) return 'border-warning-500/15 hover:border-warning-500/25'
  return 'border-border hover:border-accent-500/20'
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
    class="group bg-surface-800/40 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-surface-800/70 hover:shadow-xl hover:shadow-surface-400/20 hover:-translate-y-0.5 card-glow"
    :class="borderAccent"
  >
    <!-- Preview Area -->
    <div class="aspect-[16/10] bg-surface-700/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-border/50">
      <div class="text-5xl font-display font-bold text-text-muted/15 select-none">
        {{ component.name.charAt(0) }}
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-3">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-400 transition-colors text-[15px]">
            {{ component.name }}
          </h3>
          <p class="text-xs text-text-muted mt-0.5 font-mono">v{{ component.version }}</p>
        </div>
        <StatusBadge :status="component.status" size="sm" />
      </div>

      <!-- Description -->
      <p class="text-sm text-text-secondary/80 line-clamp-2 leading-relaxed">
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
      <div class="flex items-center justify-between pt-3 border-t border-border/50">
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock class="w-3 h-3" />
          <span>{{ formatDate(component.lastUpdated) }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Users class="w-3 h-3" />
          <span class="font-mono">{{ component.usageCount.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Update indicator -->
      <div
        v-if="component.needsUpdate && component.status !== 'deprecated'"
        class="flex items-center gap-2 text-xs text-warning-400 bg-warning-500/8 px-3 py-2 rounded-lg border border-warning-500/10"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-warning-400 animate-subtle-pulse"></span>
        Update available
      </div>
    </div>
  </article>
</template>
