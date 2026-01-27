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
    primary: 'from-primary-600/20 to-primary-600/5 border-primary-500/30',
    success: 'from-success-500/20 to-success-500/5 border-success-500/30',
    warning: 'from-warning-500/20 to-warning-500/5 border-warning-500/30',
    danger: 'from-danger-500/20 to-danger-500/5 border-danger-500/30'
  }
  return colors[props.color || 'primary']
})

const iconColorClass = computed(() => {
  const colors = {
    primary: 'text-primary-400 bg-primary-500/20',
    success: 'text-success-500 bg-success-500/20',
    warning: 'text-warning-500 bg-warning-500/20',
    danger: 'text-danger-500 bg-danger-500/20'
  }
  return colors[props.color || 'primary']
})

const trendComponent = computed(() => {
  if (!props.trend) return Minus
  return props.trend > 0 ? TrendingUp : TrendingDown
})

const trendClass = computed(() => {
  if (!props.trend) return 'text-text-muted'
  return props.trend > 0 ? 'text-success-500' : 'text-danger-500'
})
</script>

<template>
  <div 
    class="bg-gradient-to-br border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
    :class="colorClasses"
  >
    <div class="flex items-start justify-between mb-4">
      <div 
        v-if="icon"
        class="p-2.5 rounded-xl"
        :class="iconColorClass"
      >
        <component :is="icon" class="w-5 h-5" />
      </div>
      <div 
        v-if="trend !== undefined"
        class="flex items-center gap-1 text-sm font-medium"
        :class="trendClass"
      >
        <component :is="trendComponent" class="w-4 h-4" />
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </div>
    
    <div>
      <p class="text-3xl font-bold text-text-primary mb-1">
        {{ typeof value === 'number' ? value.toLocaleString() : value }}
      </p>
      <p class="text-sm text-text-secondary">{{ title }}</p>
      <p v-if="subtitle" class="text-xs text-text-muted mt-1">{{ subtitle }}</p>
    </div>
  </div>
</template>
