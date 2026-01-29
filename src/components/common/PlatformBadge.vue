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
    class: 'bg-surface-600/40 text-text-muted border-border/50 hover:bg-surface-600/60 hover:text-text-secondary'
  },
  android: {
    label: 'Android',
    icon: Smartphone,
    class: 'bg-surface-600/40 text-text-muted border-border/50 hover:bg-surface-600/60 hover:text-text-secondary'
  },
  web: {
    label: 'Web',
    icon: Globe,
    class: 'bg-accent-500/8 text-accent-400/70 border-accent-500/10 hover:bg-accent-500/15 hover:text-accent-400'
  }
}

const config = computed(() => platformConfig[props.platform])
</script>

<template>
  <span
    class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md border tracking-wide platform-badge"
    :class="config.class"
  >
    <component :is="config.icon" class="w-2.5 h-2.5 platform-icon" />
    {{ config.label }}
  </span>
</template>

<style scoped>
.platform-badge {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.platform-badge:hover {
  transform: translateY(-1px);
}

.platform-icon {
  transition: transform 0.2s ease;
}

.platform-badge:hover .platform-icon {
  transform: scale(1.1);
}
</style>
