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
      color: 'text-danger-400',
      bg: 'bg-danger-500/8',
      border: 'border-danger-500/15',
      badge: 'bg-danger-500/10 text-danger-400 border-danger-500/15'
    },
    high: {
      icon: AlertCircle,
      color: 'text-warning-400',
      bg: 'bg-warning-500/8',
      border: 'border-warning-500/15',
      badge: 'bg-warning-500/10 text-warning-400 border-warning-500/15'
    },
    medium: {
      icon: Info,
      color: 'text-text-muted',
      bg: 'bg-surface-700/50',
      border: 'border-border',
      badge: 'bg-surface-600/50 text-text-muted border-border/50'
    }
  }
  return configs[props.issue.severity]
})

function openInFigma() {
  // Open Figma file at the specific location
  const figmaUrl = `https://www.figma.com/file/example?node-id=${encodeURIComponent(props.issue.location.frame)}`
  window.open(figmaUrl, '_blank')
}
</script>

<template>
  <article
    class="bg-surface-800/40 border rounded-2xl overflow-hidden transition-all duration-200 hover:bg-surface-800/70 hover:shadow-lg hover:shadow-surface-400/20 card-glow"
    :class="severityConfig.border"
  >
    <!-- Screenshot Preview -->
    <div v-if="issue.screenshot" class="relative aspect-video bg-surface-700">
      <img
        :src="issue.screenshot"
        :alt="issue.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      <!-- Severity Badge -->
      <span
        class="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium border tracking-wide"
        :class="severityConfig.badge"
      >
        <component :is="severityConfig.icon" class="w-3 h-3" />
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
            class="w-4 h-4 mt-0.5 shrink-0"
            :class="severityConfig.color"
          />
          <h3 class="font-semibold text-text-primary text-[15px]">{{ issue.title }}</h3>
        </div>
        <p class="text-sm text-text-secondary/80 leading-relaxed">{{ issue.description }}</p>
      </div>

      <!-- Location -->
      <div class="flex items-start gap-2 text-xs">
        <MapPin class="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
        <div class="text-text-muted font-mono">
          <span class="text-text-secondary">{{ issue.location.file }}</span>
          <span class="mx-1 opacity-40">/</span>
          <span>{{ issue.location.page }}</span>
          <span class="mx-1 opacity-40">/</span>
          <span>{{ issue.location.frame }}</span>
        </div>
      </div>

      <!-- Suggestion -->
      <div
        class="flex items-start gap-2 p-3 rounded-xl text-sm border"
        :class="[severityConfig.bg, severityConfig.border]"
      >
        <Wand2 class="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
        <div>
          <span class="text-text-muted text-xs uppercase tracking-wider">Suggestion: </span>
          <span class="text-text-secondary text-sm">{{ issue.suggestion }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 pt-1">
        <button
          v-if="issue.autoFixable"
          @click="emit('fix', issue.id)"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
        >
          <Wand2 class="w-4 h-4" />
          Fix Now
        </button>
        <button
          v-else
          @click="openInFigma"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border"
        >
          <ExternalLink class="w-4 h-4" />
          View in Figma
        </button>
        <button
          @click="emit('ignore', issue.id)"
          class="p-2.5 text-text-muted hover:text-text-primary hover:bg-surface-700/50 rounded-xl transition-all"
          title="Ignore this issue"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </article>
</template>
