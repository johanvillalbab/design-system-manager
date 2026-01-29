<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentStatus } from '@/types'

const props = defineProps<{
  status: ComponentStatus
  size?: 'sm' | 'md'
}>()

const statusConfig = {
  stable: {
    label: 'Stable',
    class: 'bg-success-500/10 text-success-400 border-success-500/20 hover:bg-success-500/15',
    dotClass: 'bg-success-400'
  },
  beta: {
    label: 'Beta',
    class: 'bg-warning-500/10 text-warning-400 border-warning-500/20 hover:bg-warning-500/15',
    dotClass: 'bg-warning-400 animate-pulse'
  },
  deprecated: {
    label: 'Deprecated',
    class: 'bg-danger-500/10 text-danger-400 border-danger-500/20 hover:bg-danger-500/15',
    dotClass: 'bg-danger-400'
  }
}

const config = computed(() => statusConfig[props.status])
const sizeClass = computed(() => props.size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1')
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 font-medium rounded-md border tracking-wide transition-all duration-200 status-badge"
    :class="[config.class, sizeClass]"
  >
    <span 
      class="w-1.5 h-1.5 rounded-full status-dot"
      :class="config.dotClass"
    ></span>
    {{ config.label }}
  </span>
</template>

<style scoped>
.status-badge {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.status-badge:hover {
  transform: translateY(-1px);
}

.status-dot {
  transition: transform 0.2s ease;
}

.status-badge:hover .status-dot {
  transform: scale(1.2);
}
</style>
