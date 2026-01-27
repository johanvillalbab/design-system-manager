<script setup lang="ts">
import { computed } from 'vue'
import type { Platform } from '@/types'
import { Smartphone, Monitor, Globe } from 'lucide-vue-next'

const props = defineProps<{
  platform: Platform
}>()

const platformConfig = {
  ios: { 
    label: 'iOS', 
    icon: Smartphone,
    class: 'bg-surface-600 text-text-secondary' 
  },
  android: { 
    label: 'Android', 
    icon: Smartphone,
    class: 'bg-surface-600 text-text-secondary' 
  },
  web: { 
    label: 'Web', 
    icon: Globe,
    class: 'bg-surface-600 text-text-secondary' 
  }
}

const config = computed(() => platformConfig[props.platform])
</script>

<template>
  <span 
    class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md"
    :class="config.class"
  >
    <component :is="config.icon" class="w-3 h-3" />
    {{ config.label }}
  </span>
</template>
