<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max?: number
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}>()

const percentage = computed(() => {
  const max = props.max || 100
  return Math.min(Math.max((props.value / max) * 100, 0), 100)
})

const colorClass = computed(() => {
  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500'
  }
  return colors[props.color || 'primary']
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }
  return sizes[props.size || 'md']
})

const dynamicColor = computed(() => {
  if (percentage.value >= 80) return 'bg-success-500'
  if (percentage.value >= 50) return 'bg-warning-500'
  return 'bg-danger-500'
})
</script>

<template>
  <div class="w-full">
    <div 
      v-if="showLabel" 
      class="flex items-center justify-between mb-2 text-sm"
    >
      <span class="text-text-secondary">Progress</span>
      <span class="text-text-primary font-medium">{{ Math.round(percentage) }}%</span>
    </div>
    <div 
      class="w-full bg-surface-600 rounded-full overflow-hidden"
      :class="sizeClass"
    >
      <div 
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="color ? colorClass : dynamicColor"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>
