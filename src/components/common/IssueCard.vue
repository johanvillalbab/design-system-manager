<script setup lang="ts">
import { computed } from 'vue'
import type { AuditIssue } from '@/types'
import { AlertTriangle, AlertCircle, Info, MapPin, Wand2, X, ExternalLink } from 'lucide-vue-next'

const props = defineProps<{
  issue: AuditIssue
}>()

const emit = defineEmits<{
  fix: [id: string]
  ignore: [id: string]
}>()

const severityConfig = computed(() => {
  const configs = {
    critical: {
      icon: AlertTriangle,
      color: 'text-danger-500',
      bg: 'bg-danger-500/10',
      border: 'border-danger-500/30',
      badge: 'bg-danger-500/15 text-danger-500'
    },
    high: {
      icon: AlertCircle,
      color: 'text-warning-500',
      bg: 'bg-warning-500/10',
      border: 'border-warning-500/30',
      badge: 'bg-warning-500/15 text-warning-500'
    },
    medium: {
      icon: Info,
      color: 'text-text-muted',
      bg: 'bg-surface-700',
      border: 'border-surface-500',
      badge: 'bg-surface-600 text-text-secondary'
    }
  }
  return configs[props.issue.severity]
})
</script>

<template>
  <article 
    class="bg-surface-800 border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
    :class="severityConfig.border"
  >
    <!-- Screenshot Preview -->
    <div v-if="issue.screenshot" class="relative aspect-video bg-surface-700">
      <img 
        :src="issue.screenshot" 
        :alt="issue.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent"></div>
      
      <!-- Severity Badge -->
      <span 
        class="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        :class="severityConfig.badge"
      >
        <component :is="severityConfig.icon" class="w-3.5 h-3.5" />
        {{ issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1) }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4">
      <!-- Header -->
      <div>
        <div class="flex items-start gap-2 mb-1">
          <component 
            v-if="!issue.screenshot"
            :is="severityConfig.icon" 
            class="w-5 h-5 mt-0.5 shrink-0"
            :class="severityConfig.color"
          />
          <h3 class="font-semibold text-text-primary">{{ issue.title }}</h3>
        </div>
        <p class="text-sm text-text-secondary">{{ issue.description }}</p>
      </div>

      <!-- Location -->
      <div class="flex items-start gap-2 text-sm">
        <MapPin class="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
        <div class="text-text-secondary">
          <span class="text-text-primary font-medium">{{ issue.location.file }}</span>
          <span class="mx-1.5">›</span>
          <span>{{ issue.location.page }}</span>
          <span class="mx-1.5">›</span>
          <span>{{ issue.location.frame }}</span>
        </div>
      </div>

      <!-- Suggestion -->
      <div 
        class="flex items-start gap-2 p-3 rounded-lg text-sm"
        :class="severityConfig.bg"
      >
        <Wand2 class="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
        <div>
          <span class="text-text-muted">Suggestion: </span>
          <span class="text-text-primary">{{ issue.suggestion }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 pt-2">
        <button
          v-if="issue.autoFixable"
          @click="emit('fix', issue.id)"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
        >
          <Wand2 class="w-4 h-4" />
          Fix Now
        </button>
        <button
          v-else
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-700 hover:bg-surface-600 text-text-primary font-medium rounded-lg transition-colors"
        >
          <ExternalLink class="w-4 h-4" />
          View in Figma
        </button>
        <button
          @click="emit('ignore', issue.id)"
          class="p-2.5 text-text-muted hover:text-text-primary hover:bg-surface-700 rounded-lg transition-colors"
          title="Ignore this issue"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>
  </article>
</template>
