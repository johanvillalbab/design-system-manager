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
    class: 'bg-success-500/15 text-success-500 ring-success-500/30' 
  },
  beta: { 
    label: 'Beta', 
    class: 'bg-warning-500/15 text-warning-500 ring-warning-500/30' 
  },
  deprecated: { 
    label: 'Deprecated', 
    class: 'bg-danger-500/15 text-danger-500 ring-danger-500/30' 
  }
}

const config = computed(() => statusConfig[props.status])
const sizeClass = computed(() => props.size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1')
</script>

<template>
  <span 
    class="inline-flex items-center font-medium rounded-full ring-1"
    :class="[config.class, sizeClass]"
  >
    {{ config.label }}
  </span>
</template>
