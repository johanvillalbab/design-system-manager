<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps<{
  value: number
  max?: number
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
}>()

// Animated display value
const displayValue = ref(0)
const hasAnimated = ref(false)

const percentage = computed(() => {
  const max = props.max || 100
  return Math.min(Math.max((props.value / max) * 100, 0), 100)
})

// Animate the counter when mounted or value changes
function animateValue(target: number) {
  const duration = 1000
  const startTime = Date.now()
  const startValue = displayValue.value
  
  function update() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    displayValue.value = startValue + (target - startValue) * easeOutQuart
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  
  update()
}

onMounted(() => {
  if (props.animated !== false) {
    setTimeout(() => {
      animateValue(percentage.value)
      hasAnimated.value = true
    }, 200)
  } else {
    displayValue.value = percentage.value
    hasAnimated.value = true
  }
})

watch(() => percentage.value, (newVal) => {
  if (hasAnimated.value) {
    animateValue(newVal)
  }
})

const colorClass = computed(() => {
  const colors = {
    primary: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500'
  }
  return colors[props.color || 'primary']
})

const glowColor = computed(() => {
  const colors = {
    primary: 'rgba(251, 191, 36, 0.5)',
    success: 'rgba(34, 197, 94, 0.5)',
    warning: 'rgba(245, 158, 11, 0.5)',
    danger: 'rgba(244, 63, 94, 0.5)'
  }
  return colors[props.color || 'primary']
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
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
      class="flex items-center justify-between mb-2 text-xs"
    >
      <span class="text-text-muted">Progress</span>
      <span class="text-text-primary font-medium font-mono tabular-nums">
        {{ Math.round(displayValue) }}%
      </span>
    </div>
    <div
      class="w-full bg-surface-600/30 rounded-full overflow-hidden relative"
      :class="sizeClass"
    >
      <!-- Progress Fill -->
      <div
        class="h-full rounded-full progress-bar relative overflow-hidden"
        :class="color ? colorClass : dynamicColor"
        :style="{ 
          width: `${displayValue}%`,
          boxShadow: `0 0 8px ${glowColor}`
        }"
      >
        <!-- Shimmer Effect -->
        <div 
          v-if="percentage > 0"
          class="shimmer-effect"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease;
}

.shimmer-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
