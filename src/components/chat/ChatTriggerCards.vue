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

const defaultStyle = { iconColor: 'text-accent-400', boxBg: 'bg-accent-500/8', boxBorder: 'border-accent-500/15' }

const styleMap: Record<string, { iconColor: string; boxBg: string; boxBorder: string }> = {
  Activity:      { iconColor: 'text-accent-400',  boxBg: 'bg-accent-500/8',   boxBorder: 'border-accent-500/15' },
  AlertTriangle: { iconColor: 'text-warning-400', boxBg: 'bg-warning-500/8',  boxBorder: 'border-warning-500/15' },
  Box:           { iconColor: 'text-violet-400',  boxBg: 'bg-violet-500/8',   boxBorder: 'border-violet-500/15' },
  Bug:           { iconColor: 'text-danger-400',  boxBg: 'bg-danger-500/8',   boxBorder: 'border-danger-500/15' },
  BarChart3:     { iconColor: 'text-success-400', boxBg: 'bg-success-500/8',  boxBorder: 'border-success-500/15' },
  GitMerge:      { iconColor: 'text-accent-300',  boxBg: 'bg-accent-500/8',   boxBorder: 'border-accent-500/15' },
}

function getIcon(iconName: string) {
  return iconMap[iconName] ?? Box
}

function getStyle(iconName: string) {
  return styleMap[iconName] ?? defaultStyle
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
        class="group flex flex-col gap-2.5 p-4 bg-surface-800 border border-border/50 rounded-2xl hover:bg-surface-800/70 hover:border-border-hover transition-all duration-200 text-left"
      >
        <div
          class="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          :class="[getStyle(suggestion.icon).boxBg, getStyle(suggestion.icon).boxBorder, 'border']"
        >
          <component
            :is="getIcon(suggestion.icon)"
            class="w-4 h-4 transition-colors"
            :class="getStyle(suggestion.icon).iconColor"
          />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-text-primary leading-tight mb-1">{{ suggestion.label }}</p>
          <p class="text-xs text-text-secondary leading-relaxed">{{ suggestion.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>
