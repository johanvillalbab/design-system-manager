<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  value: string | number
  subtitle?: string
  trend?: number
  icon?: any
  color?: 'primary' | 'success' | 'warning' | 'danger'
}>()

const colorClasses = computed(() => {
  const colors = {
    primary: 'border-accent-500/10 hover:border-accent-500/20',
    success: 'border-success-500/10 hover:border-success-500/20',
    warning: 'border-warning-500/10 hover:border-warning-500/20',
    danger: 'border-danger-500/10 hover:border-danger-500/20'
  }
  return colors[props.color || 'primary']
})

const iconColorClass = computed(() => {
  const colors = {
    primary: 'text-accent-400 bg-accent-500/10',
    success: 'text-success-400 bg-success-500/10',
    warning: 'text-warning-400 bg-warning-500/10',
    danger: 'text-danger-400 bg-danger-500/10'
  }
  return colors[props.color || 'primary']
})

const trendComponent = computed(() => {
  if (!props.trend) return Minus
  return props.trend > 0 ? TrendingUp : TrendingDown
})

const trendClass = computed(() => {
  if (!props.trend) return 'text-text-muted'
  return props.trend > 0 ? 'text-success-400' : 'text-danger-400'
})
</script>

<template>
  <div
    class="bg-surface-800/50 border rounded-2xl p-5 transition-all duration-300 hover:bg-surface-800/80 card-glow group"
    :class="colorClasses"
  >
    <div class="flex items-start justify-between mb-5">
      <div
        v-if="icon"
        class="p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-105"
        :class="iconColorClass"
      >
        <component :is="icon" class="w-5 h-5" />
      </div>
      <div
        v-if="trend !== undefined"
        class="flex items-center gap-1 text-xs font-medium font-mono"
        :class="trendClass"
      >
        <component :is="trendComponent" class="w-3.5 h-3.5" />
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </div>

    <div>
      <p class="text-3xl font-display font-bold text-text-primary mb-1.5 tracking-tight">
        {{ typeof value === 'number' ? value.toLocaleString() : value }}
      </p>
      <p class="text-sm text-text-muted">{{ title }}</p>
      <p v-if="subtitle" class="text-xs text-text-muted/70 mt-1">{{ subtitle }}</p>
    </div>
  </div>
</template>
