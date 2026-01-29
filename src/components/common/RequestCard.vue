<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentRequest } from '@/types'
import { ThumbsUp, MessageSquare, Paperclip, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  request: ComponentRequest
  hasVoted?: boolean
}>()

const emit = defineEmits<{
  vote: [id: string]
  view: [id: string]
}>()

const statusConfig = computed(() => {
  const configs = {
    submitted: {
      label: 'Submitted',
      color: 'bg-surface-600/50 text-text-muted border-border/50'
    },
    under_review: {
      label: 'Under Review',
      color: 'bg-warning-500/10 text-warning-400 border-warning-500/15'
    },
    in_development: {
      label: 'In Development',
      color: 'bg-accent-500/10 text-accent-400 border-accent-500/15'
    },
    ready: {
      label: 'Ready',
      color: 'bg-success-500/10 text-success-400 border-success-500/15'
    }
  }
  return configs[props.request.status]
})

const priorityConfig = computed(() => {
  const configs = {
    low: { label: 'Low', color: 'text-text-muted' },
    medium: { label: 'Medium', color: 'text-text-secondary' },
    high: { label: 'High', color: 'text-warning-400' },
    critical: { label: 'Critical', color: 'text-danger-400' }
  }
  return configs[props.request.priority]
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <article class="bg-surface-800/40 border border-border rounded-2xl p-5 transition-all duration-200 hover:bg-surface-800/70 hover:border-border-hover card-glow group">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3">
        <img
          :src="request.author.avatar"
          :alt="request.author.name"
          class="w-10 h-10 rounded-xl ring-1 ring-border"
        />
        <div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-400 transition-colors text-[15px]">
            {{ request.title }}
          </h3>
          <p class="text-xs text-text-muted mt-0.5">
            by {{ request.author.name }} · {{ formatDate(request.createdAt) }}
          </p>
        </div>
      </div>
      <span
        class="px-2.5 py-1 rounded-md text-[10px] font-medium shrink-0 border tracking-wide"
        :class="statusConfig.color"
      >
        {{ statusConfig.label }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-sm text-text-secondary/80 mb-4 line-clamp-2 leading-relaxed">
      {{ request.description }}
    </p>

    <!-- Meta Info -->
    <div class="flex items-center gap-4 text-xs text-text-muted mb-4">
      <span :class="priorityConfig.color" class="font-medium">
        {{ priorityConfig.label }} Priority
      </span>
      <span class="font-mono">{{ request.affectedProjects }} projects</span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-border/50">
      <div class="flex items-center gap-3">
        <!-- Vote Button -->
        <button
          @click.stop="emit('vote', request.id)"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm"
          :class="[
            hasVoted
              ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
              : 'bg-surface-700/50 text-text-muted hover:bg-surface-600/50 hover:text-text-secondary border border-transparent'
          ]"
        >
          <ThumbsUp class="w-3.5 h-3.5" :class="{ 'fill-current': hasVoted }" />
          <span class="font-medium font-mono text-xs">{{ request.votes }}</span>
        </button>

        <!-- Comments -->
        <div class="flex items-center gap-1.5 text-text-muted text-xs">
          <MessageSquare class="w-3.5 h-3.5" />
          <span class="font-mono">{{ request.comments.length }}</span>
        </div>

        <!-- Attachments -->
        <div v-if="request.attachments.length > 0" class="flex items-center gap-1.5 text-text-muted text-xs">
          <Paperclip class="w-3.5 h-3.5" />
          <span class="font-mono">{{ request.attachments.length }}</span>
        </div>
      </div>

      <!-- View Details -->
      <button
        @click="emit('view', request.id)"
        class="flex items-center gap-1 text-xs text-text-muted hover:text-accent-400 transition-colors font-medium"
      >
        View
        <ChevronRight class="w-3.5 h-3.5" />
      </button>
    </div>
  </article>
</template>
