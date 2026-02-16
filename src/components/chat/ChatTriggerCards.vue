<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { Activity, AlertTriangle, Box, Bug, BarChart3, GitMerge } from 'lucide-vue-next'

const emit = defineEmits<{
  trigger: [command: string]
}>()

const chatStore = useChatStore()

const iconMap: Record<string, any> = {
  Activity,
  AlertTriangle,
  Box,
  Bug,
  BarChart3,
  GitMerge,
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
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      <button
        v-for="suggestion in chatStore.suggestions"
        :key="suggestion.id"
        @click="emit('trigger', suggestion.trigger)"
        class="group flex flex-col gap-2.5 p-4 bg-surface-800/40 border border-border rounded-2xl hover:bg-surface-800/70 hover:border-accent-500/30 transition-all duration-200 text-left"
      >
        <div class="w-8 h-8 rounded-xl bg-surface-700/60 border border-border/50 flex items-center justify-center group-hover:bg-accent-500/10 group-hover:border-accent-500/20 transition-all duration-200">
          <component :is="getIcon(suggestion.icon)" class="w-4 h-4 text-text-muted group-hover:text-accent-400 transition-colors" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-text-primary group-hover:text-accent-300 transition-colors leading-tight mb-1">{{ suggestion.label }}</p>
          <p class="text-[11px] text-text-muted leading-relaxed line-clamp-2">{{ suggestion.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>
