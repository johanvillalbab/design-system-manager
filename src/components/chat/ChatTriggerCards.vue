<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { Activity, AlertTriangle, Box } from 'lucide-vue-next'

const emit = defineEmits<{
  trigger: [command: string]
}>()

const chatStore = useChatStore()

const iconMap: Record<string, any> = {
  Activity,
  AlertTriangle,
  Box,
}

function getIcon(iconName: string) {
  return iconMap[iconName] || Box
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <span class="text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em]">Elige una tarea, cualquiera</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="suggestion in chatStore.suggestions"
        :key="suggestion.id"
        @click="emit('trigger', suggestion.trigger)"
        class="group flex items-center gap-2.5 px-4 py-2.5 bg-surface-800/40 border border-border rounded-xl hover:bg-surface-800/70 hover:border-accent-500/20 transition-all duration-200 text-left"
      >
        <component :is="getIcon(suggestion.icon)" class="w-4 h-4 text-text-muted group-hover:text-accent-400 transition-colors flex-shrink-0" />
        <span class="text-sm font-medium text-text-primary group-hover:text-accent-300 transition-colors whitespace-nowrap">{{ suggestion.label }}</span>
      </button>
    </div>
  </div>
</template>
